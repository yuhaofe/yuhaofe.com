"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

/* ------------------------------------------------------------------ */
/* shaders                                                             */
/* ------------------------------------------------------------------ */

const OCEAN_VERT = /* glsl */ `
uniform float uTime;
uniform vec2 uMouse;      // world-space xz of cursor on the plane
uniform float uMouseAmp;  // 0..1 disturbance strength

varying float vElev;
varying vec3 vPos;
varying vec3 vNormalW;

// one Gerstner wave; returns displaced y and accumulates xz push
vec3 gerstner(vec2 dir, float steep, float wl, vec3 p, float t) {
  float k = 6.28318530718 / wl;
  float c = sqrt(9.8 / k);
  vec2 d = normalize(dir);
  float f = k * (dot(d, p.xz) - c * t);
  float a = steep / k;
  return vec3(d.x * (a * cos(f)), a * sin(f), d.y * (a * cos(f)));
}

vec3 displace(vec3 p, float t) {
  vec3 g = vec3(0.0);
  g += gerstner(vec2(1.0, 0.6), 0.22, 9.0, p, t);
  g += gerstner(vec2(-0.7, 1.0), 0.16, 5.0, p, t * 1.2);
  g += gerstner(vec2(0.3, -1.0), 0.12, 2.8, p, t * 0.8);
  g += gerstner(vec2(1.0, -0.2), 0.08, 1.6, p, t * 1.6);
  g += gerstner(vec2(-0.4, -0.9), 0.06, 0.95, p, t * 2.1);
  g += gerstner(vec2(0.8, 0.5), 0.045, 0.55, p, t * 2.8);
  // cursor disturbance ripple
  float md = distance(p.xz, uMouse);
  g.y += sin(md * 4.0 - t * 6.0) * exp(-md * 0.55) * 0.55 * uMouseAmp;
  return p + g;
}

void main() {
  vec3 p = displace(position, uTime);
  // normal via finite differences
  float e = 0.35;
  vec3 px = displace(position + vec3(e, 0.0, 0.0), uTime);
  vec3 pz = displace(position + vec3(0.0, 0.0, e), uTime);
  vNormalW = normalize(cross(pz - p, px - p));
  vElev = p.y;
  vPos = p;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

const OCEAN_FRAG = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec3 uCamPos;

varying float vElev;
varying vec3 vPos;
varying vec3 vNormalW;

void main() {
  vec3 deep = vec3(0.004, 0.018, 0.042);
  vec3 cyan = vec3(0.133, 0.827, 0.933);
  vec3 blue = vec3(0.231, 0.510, 0.965);

  vec3 V = normalize(uCamPos - vPos);

  // fragment-level fine ripple detail on top of the geometric normal
  float r1 = sin(vPos.x * 8.0 + uTime * 1.7) * sin(vPos.z * 6.5 - uTime * 1.3);
  float r2 = sin(vPos.x * 17.0 - uTime * 2.6 + vPos.z * 13.0);
  vec3 N = normalize(vNormalW + vec3(r1 * 0.18 + r2 * 0.07, 0.0, r1 * 0.14 - r2 * 0.06));

  float fresnel = pow(1.0 - max(dot(N, V), 0.0), 3.0);

  // crest glow by elevation
  float crest = smoothstep(0.20, 0.55, vElev);

  // scanline-ish micro bands on the surface
  float bands = sin(vPos.z * 6.0 + vPos.x * 2.0 + uTime * 0.6) * 0.5 + 0.5;
  bands = pow(bands, 8.0) * 0.16;

  // key-light specular glints on the ripple detail
  vec3 L = normalize(vec3(-0.4, 0.8, 0.45));
  float spec = pow(max(dot(reflect(-L, N), V), 0.0), 60.0);

  vec3 col = deep;
  col += mix(blue, cyan, fresnel) * fresnel * 0.55;
  col += cyan * crest * 1.05;
  col += blue * bands;
  col += cyan * spec * 0.5;

  // distance fade into the deep
  float dist = length(vPos.xz - uCamPos.xz);
  col = mix(col, deep * 0.4, smoothstep(14.0, 60.0, dist));

  gl_FragColor = vec4(col, 1.0);
}
`;

const PARTICLE_VERT = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
attribute float aSeed;
varying float vSeed;

void main() {
  vSeed = aSeed;
  vec3 p = position;
  p.y += sin(uTime * (0.2 + aSeed * 0.4) + aSeed * 40.0) * 1.2;
  p.x += cos(uTime * 0.15 + aSeed * 60.0) * 1.5;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = (1.2 + aSeed * 2.4) * uPixelRatio * (14.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
`;

const PARTICLE_FRAG = /* glsl */ `
precision highp float;
varying float vSeed;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  vec3 cyan = vec3(0.133, 0.827, 0.933);
  vec3 blue = vec3(0.231, 0.510, 0.965);
  gl_FragColor = vec4(mix(blue, cyan, vSeed), a * 0.45);
}
`;

const POST_SHADER = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    uTime: { value: 0 },
    uAberration: { value: 0.0016 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    precision highp float;
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uAberration;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    void main() {
      vec2 centered = vUv - 0.5;
      float r2 = dot(centered, centered);

      // chromatic aberration, stronger toward edges
      vec2 off = centered * r2 * uAberration * 60.0;
      vec3 col;
      col.r = texture2D(tDiffuse, vUv + off).r;
      col.g = texture2D(tDiffuse, vUv).g;
      col.b = texture2D(tDiffuse, vUv - off).b;

      // film grain
      col += (hash(vUv * 900.0 + fract(uTime) * 100.0) - 0.5) * 0.045;

      // vignette
      col *= smoothstep(0.95, 0.35, r2);

      gl_FragColor = vec4(col, 1.0);
    }
  `,
};

/* ------------------------------------------------------------------ */
/* camera timeline: one "shot" per section                             */
/* ------------------------------------------------------------------ */

interface Shot {
  pos: THREE.Vector3;
  look: THREE.Vector3;
  fov: number;
}

const SHOTS: Shot[] = [
  // hero — wide establishing shot over the swell
  { pos: new THREE.Vector3(0, 3.2, 12), look: new THREE.Vector3(0, 0.5, -6), fov: 58 },
  // about — low side dolly
  { pos: new THREE.Vector3(7.5, 1.6, 5), look: new THREE.Vector3(-2, 0.4, -4), fov: 50 },
  // projects — high crane looking across the field
  { pos: new THREE.Vector3(0, 8.5, 3.5), look: new THREE.Vector3(0, 0, -8), fov: 46 },
  // blog — grazing angle, waves at eye level
  { pos: new THREE.Vector3(-8, 1.1, 4), look: new THREE.Vector3(3, 1.2, -6), fov: 54 },
  // contact — pull back and rise, closing shot
  { pos: new THREE.Vector3(0, 10, 16), look: new THREE.Vector3(0, 0, 0), fov: 42 },
];

const N = SHOTS.length;

function sampleShots(p: number, outPos: THREE.Vector3, outLook: THREE.Vector3): number {
  const t = Math.min(N - 1, Math.max(0, p * (N - 1)));
  const i = Math.min(N - 2, Math.floor(t));
  const fRaw = t - i;
  const f = fRaw * fRaw * (3 - 2 * fRaw); // smoothstep between shots
  const a = SHOTS[i];
  const b = SHOTS[Math.min(N - 1, i + 1)];
  outPos.lerpVectors(a.pos, b.pos, f);
  outLook.lerpVectors(a.look, b.look, f);
  return a.fov + (b.fov - a.fov) * f;
}

/* ------------------------------------------------------------------ */

export default function WaveCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    const DPR = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(DPR);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030b18);
    scene.fog = new THREE.Fog(0x030b18, 20, 70);

    const camera = new THREE.PerspectiveCamera(
      SHOTS[0].fov,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.copy(SHOTS[0].pos);

    /* --- ocean --- */
    const oceanGeo = new THREE.PlaneGeometry(140, 140, 224, 224);
    oceanGeo.rotateX(-Math.PI / 2);
    const oceanUniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(999, 999) },
      uMouseAmp: { value: 0 },
      uCamPos: { value: camera.position },
    };
    const oceanMat = new THREE.ShaderMaterial({
      vertexShader: OCEAN_VERT,
      fragmentShader: OCEAN_FRAG,
      uniforms: oceanUniforms,
    });
    const ocean = new THREE.Mesh(oceanGeo, oceanMat);
    ocean.position.z = -15;
    scene.add(ocean);

    /* --- particles --- */
    const COUNT = 1600;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 70;
      positions[i * 3 + 1] = Math.random() * 16 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 70 - 10;
      seeds[i] = Math.random();
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    const pMat = new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VERT,
      fragmentShader: PARTICLE_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: DPR },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    /* --- postprocessing --- */
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2),
      0.55, // strength
      0.45, // radius
      0.55 // threshold — only true highlights bloom
    );
    composer.addPass(bloom);
    const postPass = new ShaderPass(POST_SHADER);
    composer.addPass(postPass);

    /* --- interaction state --- */
    const mouse = new THREE.Vector2(0, 0); // ndc
    const mouseWorld = new THREE.Vector2(999, 999);
    let mouseAmpTarget = 0;
    const raycaster = new THREE.Raycaster();
    const seaPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hit = new THREE.Vector3();

    const onPointerMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseAmpTarget = 1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const camPos = new THREE.Vector3();
    const camLook = new THREE.Vector3();
    const startTime = performance.now();
    let raf = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = (performance.now() - startTime) / 1000;

      // scroll → camera timeline
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const fov = sampleShots(p, camPos, camLook);

      // mouse parallax on top of the shot
      camPos.x += mouse.x * 0.9;
      camPos.y += mouse.y * 0.45;
      camLook.x += mouse.x * 1.4;

      camera.position.lerp(camPos, 0.055);
      camera.lookAt(camLook);
      camera.fov += (fov - camera.fov) * 0.06;
      camera.updateProjectionMatrix();
      // subtle roll for a hand-held feel
      camera.rotation.z += mouse.x * 0.012 + Math.sin(t * 0.3) * 0.004;

      // cursor → world ripple
      raycaster.setFromCamera(mouse, camera);
      if (raycaster.ray.intersectPlane(seaPlane, hit)) {
        mouseWorld.lerp(new THREE.Vector2(hit.x, hit.z + 15), 0.1);
        oceanUniforms.uMouse.value.copy(mouseWorld);
      }
      mouseAmpTarget *= 0.985; // decay when the cursor rests
      oceanUniforms.uMouseAmp.value +=
        (mouseAmpTarget - oceanUniforms.uMouseAmp.value) * 0.08;

      oceanUniforms.uTime.value = t;
      pMat.uniforms.uTime.value = t;
      postPass.uniforms.uTime.value = t;

      composer.render();
    };
    tick();

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
      bloom.setSize(w / 2, h / 2);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      oceanGeo.dispose();
      oceanMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      composer.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
