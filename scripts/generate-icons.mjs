import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const pub = path.join(root, 'public')
const svgPath = path.join(pub, 'favicon.svg')

async function main() {
  const svg = fs.readFileSync(svgPath)

  const png96 = await sharp(svg).resize(96, 96).png().toBuffer()
  fs.writeFileSync(path.join(pub, 'favicon-96x96.png'), png96)

  const apple = await sharp(svg).resize(180, 180).png().toBuffer()
  fs.writeFileSync(path.join(pub, 'apple-touch-icon.png'), apple)

  const p32 = await sharp(svg).resize(32, 32).png().toBuffer()
  const p16 = await sharp(svg).resize(16, 16).png().toBuffer()
  const ico = await pngToIco([p32, p16])
  fs.writeFileSync(path.join(pub, 'favicon.ico'), ico)

  const og = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: { r: 10, g: 22, b: 54 },
    },
  })
    .composite([
      {
        input: await sharp(svg).resize(420, 260).png().toBuffer(),
        gravity: 'center',
      },
    ])
    .jpeg({ quality: 85 })
    .toBuffer()
  fs.writeFileSync(path.join(pub, 'og-image.jpg'), og)

  const p192 = await sharp(svg).resize(192, 192).png().toBuffer()
  fs.writeFileSync(path.join(pub, 'web-app-manifest-192x192.png'), p192)
  const p512 = await sharp(svg).resize(512, 512).png().toBuffer()
  fs.writeFileSync(path.join(pub, 'web-app-manifest-512x512.png'), p512)

  console.log('Wrote favicon.ico, favicon-96x96.png, apple-touch-icon.png, og-image.jpg, PWA icons')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
