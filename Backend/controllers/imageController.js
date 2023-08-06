const { Storage } = require('@google-cloud/storage');
const path = require('path');
const sharp = require('sharp')
const { format } = require('util');
const fs = require('fs')

const storage = new Storage({
  projectId: 'esoteric-pen-394012', // Remplacez par l'ID de votre projet Google Cloud
  keyFilename: path.join(__dirname, '../esoteric-pen-394012-806e2bf8f3b5.json'), // Remplacez par le chemin de votre fichier de clé
});

const bucket = storage.bucket('2gether_test');

// Fonction pour télécharger une image dans Cloud Storage
async function uploadImageToStorage(file, folderPath, fileName) {
    return new Promise((resolve, reject) => {
        // Renommer le fichier localement
        const renamedFilePath = `${fileName}`;
        fs.writeFileSync(renamedFilePath, file.buffer);

        // Chemin pour le fichier compressé
        const compressedFilePath = `${fileName}_compressed.jpg`; // Utilisez l'extension appropriée

        // Compresser l'image avec sharp
        sharp(renamedFilePath)
            .resize({ width: 800 }) // Ajustez la taille selon vos besoins
            .toFile(compressedFilePath, async (err, info) => {
                if (err) {
                    // Supprimer les fichiers temporaires en cas d'erreur
                    fs.unlinkSync(renamedFilePath);
                    reject(err);
                } else {
                    // Créer un nouveau blob dans le bucket et télécharger les données du fichier compressé
                    const blob = bucket.file(`${folderPath}/${fileName}`);
                    const blobStream = blob.createWriteStream();

                    blobStream.on('error', (err) => {
                        // Supprimer les fichiers temporaires en cas d'erreur
                        fs.unlinkSync(renamedFilePath);
                        fs.unlinkSync(compressedFilePath);
                        reject(err);
                    });

                    blobStream.on('finish', () => {
                        // Supprimer les fichiers temporaires après le téléchargement
                        fs.unlinkSync(renamedFilePath);
                        fs.unlinkSync(compressedFilePath);

                        // L'URL publique peut être utilisée pour accéder directement au fichier via HTTP.
                        const publicUrl = format(
                            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
                        );
                        resolve(publicUrl);
                    });

                    // Envoyer le contenu du fichier compressé au blobStream
                    blobStream.end(fs.readFileSync(compressedFilePath));
                }
            });
    });
}


module.exports = { uploadImageToStorage };
