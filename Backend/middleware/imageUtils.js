const sharp = require('sharp')

const imageUtils = {
    compressImage: async (imageBuffer) => {
        return sharp(imageBuffer)
            .resize(800)
            .toBuffer();
    },

    checkImageSize : async (images) => {
        const compressedImages = await Promise.all(images.map(imageUtils.compressImage));
        const maxSize = 1 * 1024 * 1024; // Taille maximale autorisée : 1 Mo
      
        for (let i = 0; i < compressedImages.length; i++) {
          if (compressedImages[i].length > maxSize) {
            throw new Error(`L'image ${i + 1} est trop grande (plus de 1 Mo après compression).`);
          }
        }
      }
};

// module.exports = imageUtils;