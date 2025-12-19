const fs = require('fs');
const path = require('path');

// Create resized versions using canvas
const sharp = require('sharp');

const sourceImage = path.join(__dirname, '../public/logos/contreras_logo_light2.png');
const outputDir = path.join(__dirname, '../public');

async function generateFavicons() {
  try {
    // Generate 32x32 favicon
    await sharp(sourceImage)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(outputDir, 'favicon-32x32.png'));

    // Generate 16x16 favicon
    await sharp(sourceImage)
      .resize(16, 16, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(outputDir, 'favicon-16x16.png'));

    // Generate 180x180 Apple touch icon
    await sharp(sourceImage)
      .resize(180, 180, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));

    // Generate 192x192 for PWA
    await sharp(sourceImage)
      .resize(192, 192, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(outputDir, 'icon-192x192.png'));

    // Generate 512x512 for PWA
    await sharp(sourceImage)
      .resize(512, 512, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(outputDir, 'icon-512x512.png'));

    console.log('✅ Favicons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
  }
}

generateFavicons();
