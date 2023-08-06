// users.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyUser = require('../middleware/verifyUser');



const upload = multer({
    storage: multer.memoryStorage(), // Stocker les fichiers en mémoire pour vérifier leur taille avant l'upload
    limits: {
      fileSize: 1 * 1024 * 1024, // Limite de 1 Mo
    },
  });

router.post('/inscription', userController.register);
router.post('/connexion', userController.login);
router.get('/rejoindre', verifyUser, (req, res) => {
    return res.json({ Status: "Succes", id: req.id });
})
router.get('/proposer', verifyUser, (req, res) => {
    return res.json({ Status: "Succes", id: req.id });
})
router.get('/rejoindre',userController.join);
router.post('/proposer', userController.propose);
router.post('/saveImage', upload.single('file'),userController.saveImageOnServer);
module.exports = router;
