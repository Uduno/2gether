// userController.js

const imageController = require('../controllers/imageController')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../database');

const saltRounds = 10;

const userController = {
    register: (req, res) => {
        // Logique pour l'inscription des utilisateurs
        const { name, email, password } = req.body;

        // Vérifier si le nom d'utilisateur existe déjà
        const checkUsernameQuery = "SELECT * FROM users WHERE name = ?";
        db.query(checkUsernameQuery, [name], (err, usernameResults) => {
            if (err) {
                console.error('Error checking username:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            if (usernameResults.length > 0) {
                // Le nom d'utilisateur existe déjà
                return res.status(400).json({ error: 'Le nom d\'utilisateur existe déjà' });
            }

            // Vérifier si l'e-mail existe déjà
            const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
            db.query(checkEmailQuery, [email], (err, emailResults) => {
                if (err) {
                    console.error('Error checking email:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                if (emailResults.length > 0) {
                    // L'e-mail existe déjà
                    return res.status(400).json({ error: 'L\'e-mail existe déjà' });
                }

                // Insérer les données dans la base de données
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    if (err) {
                        console.error('Error hashing password:', err);
                        return res.status(500).json({ error: 'Internal server error' });
                    }

                    const insertQuery = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
                    const values = [name, email, hash];

                    db.query(insertQuery, values, (err, result) => {
                        if (err) {
                            console.error('Error inserting data:', err);
                            return res.status(500).json({ error: 'Internal server error' });
                        }
                        return res.status(200).json({ message: 'Success' });
                    });
                });
            });
        });
    },

    login: (req, res) => {
        // Logique pour la connexion des utilisateurs
        const sql = "SELECT * FROM users WHERE email = ?";
        db.query(sql, [req.body.email], (err, data) => {
            if (err) return res.json({ error: "Erreur de connexion au serveur" });
            if (data.length > 0) {
                bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                    if (err) return res.json({ error: "Erreur de comparaison de mot de passe" });
                    if (response) {
                        const id = data[0].id;
                        const token = jwt.sign({ id }, "jwt-secret-key", { expiresIn: '15d' });

                        // Ajouter l'attribut SameSite=None au cookie
                        res.cookie('token', token, { sameSite: 'none', secure: true }); // Assurez-vous que la connexion est sécurisée (HTTPS)

                        return res.json({ status: "Succes" });
                    } else {
                        return res.json({ error: "Email ou mot de passe incorrect" });
                    }
                });
            } else {
                return res.json({ error: "Email ou mot de passe incorrect" });
            }
        });
    },

    join: (req, res) => {
        // Logique pour rejoindre une activité
        // ...
    },

    propose: (req, res) => {
        // Logique pour proposer une activité
        const { id, id_user, type, title, dates, location, city, region, country, detail, place } = req.body;

        // Vérifier si l'id_user apparaît déjà trois fois dans la table
        const checkUserQuery = "SELECT COUNT(*) as count FROM activité WHERE id_user = ?";
        db.query(checkUserQuery, [id_user], (err, result) => {
            if (err) {
                console.error('Error checking id_user:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const userCount = result[0].count;

            if (userCount >= 3) {
                // Limite atteinte, renvoyer une erreur
                return res.status(400).json({ error: 'Limite atteinte pour cet utilisateur' });
            }

            // Si l'id_user n'a pas atteint la limite, procéder à l'insertion
            const insertQuery = "INSERT INTO activité (id, id_user, type, title, dates, location, city, region, country, detail, place) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const values = [id, id_user, type, title, dates, location, city, region, country, detail, place];

            db.query(insertQuery, values, (err, result) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                return res.status(200).json({ message: 'Success' });
            });
        });
    },
    saveImageOnServer: async (req, res) => {
        if (!req.file) {
          res.status(400).send('Aucun fichier téléchargé.');
          return;
        }
      
        const { file, body } = req;
        const { folderPath, fileName } = body;
      
        try {
          const publicUrl = await imageController.uploadImageToStorage(file, folderPath, fileName);
          res.status(200).send(publicUrl);
        } catch (error) {
          console.error('Erreur lors du téléchargement du fichier :', error);
          res.status(500).send('Erreur lors du téléchargement du fichier.');
        }
      }

};

module.exports = userController;
