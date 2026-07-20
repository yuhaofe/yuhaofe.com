export default function Marquee({
  phrase,
  reverse = false,
}: {
  phrase: string;
  reverse?: boolean;
}) {
  const row = Array.from({ length: 6 }, (_, i) => (
    <span key={i} className="marquee-item">
      <span className="text-gradient">{phrase}</span>
      <span className="marquee-separator" aria-hidden>
        ◈
      </span>
      <span className="text-outline">{phrase}</span>
      <span className="marquee-separator" aria-hidden>
        ◈
      </span>
    </span>
  ));

  return (
    <div
      className="relative z-10 overflow-hidden border-y border-cyan-400/15 bg-[#04101f]/40 py-5 backdrop-blur-sm"
      aria-hidden
    >
      <div
        className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}
      >
        {row}
        {row}
      </div>
    </div>
  );
}
