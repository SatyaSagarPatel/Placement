const sharp = require("sharp");

async function cropImage(buffer, width = 450, height = 350) {
  return await sharp(buffer).resize(width, height).toBuffer();
}

module.exports = cropImage;
