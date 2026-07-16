// Minimal static file server for previewing the exported site (`out/`).
// `output: 'export'` produces plain static files, so `next start` does not
// apply — serve `out/` directly instead: English at /, Chinese at /zh-CN.
import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(process.argv[2] ?? 'out')
const port = Number(process.env.PORT ?? 3000)

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
}

async function resolveFile(urlPath) {
  const file = path.join(root, decodeURIComponent(urlPath))
  const candidates = [file, file + '.html', path.join(file, 'index.html')]
  for (const candidate of candidates) {
    try {
      if ((await stat(candidate)).isFile()) {
        return candidate
      }
    } catch {
      // try the next candidate
    }
  }
  return null
}

createServer(async (req, res) => {
  const urlPath = (req.url ?? '/').split('?')[0]
  const found = await resolveFile(urlPath)
  const file = found ?? (await resolveFile('/404.html'))
  if (!file) {
    res.writeHead(404).end('404')
    return
  }
  res.writeHead(found ? 200 : 404, {
    'content-type': mime[path.extname(file)] ?? 'application/octet-stream',
  })
  createReadStream(file).pipe(res)
}).listen(port, () => {
  console.log(`Serving ${root} at http://localhost:${port}`)
})
