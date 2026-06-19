import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const pub  = path.join(root, 'public')
const app  = path.join(root, 'app')
const svgPath = path.join(pub, 'favicon.svg')

async function main() {
  const svg = fs.readFileSync(svgPath)

  // ── Standard favicon sizes ──────────────────────────────────────────────
  const p16 = await sharp(svg).resize(16, 16).png().toBuffer()
  const p32 = await sharp(svg).resize(32, 32).png().toBuffer()
  const p96 = await sharp(svg).resize(96, 96).png().toBuffer()

  fs.writeFileSync(path.join(pub, 'favicon-16x16.png'), p16)
  fs.writeFileSync(path.join(pub, 'favicon-32x32.png'), p32)
  fs.writeFileSync(path.join(pub, 'favicon-96x96.png'), p96)

  // ── favicon.ico → app/ (Next.js App Router special metadata route) ──────
  // Writing to public/favicon.ico would conflict with app/favicon.ico
  const ico = await pngToIco([p32, p16])
  fs.writeFileSync(path.join(app, 'favicon.ico'), ico)

  // ── Apple Touch Icon ─────────────────────────────────────────────────────
  const apple = await sharp(svg).resize(180, 180).png().toBuffer()
  fs.writeFileSync(path.join(pub, 'apple-touch-icon.png'), apple)

  // ── PWA / Android Chrome icons (match site.webmanifest names) ────────────
  const p192 = await sharp(svg).resize(192, 192).png().toBuffer()
  const p512 = await sharp(svg).resize(512, 512).png().toBuffer()
  fs.writeFileSync(path.join(pub, 'android-chrome-192x192.png'), p192)
  fs.writeFileSync(path.join(pub, 'android-chrome-512x512.png'), p512)

  // ── OG Image (1200×630) ───────────────────────────────────────────────────
  const logoBuffer = await sharp(svg).resize(420, 260).png().toBuffer()
  const og = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: { r: 10, g: 22, b: 54 },
    },
  })
    .composite([{ input: logoBuffer, gravity: 'center' }])
    .jpeg({ quality: 85 })
    .toBuffer()
  fs.writeFileSync(path.join(pub, 'og-image.jpg'), og)

  console.log([
    '✓ favicon.ico         → app/favicon.ico',
    '✓ favicon-16x16.png   → public/',
    '✓ favicon-32x32.png   → public/',
    '✓ favicon-96x96.png   → public/',
    '✓ apple-touch-icon.png → public/',
    '✓ android-chrome-192x192.png → public/',
    '✓ android-chrome-512x512.png → public/',
    '✓ og-image.jpg        → public/',
  ].join('\n'))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
