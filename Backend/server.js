const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const ckp = require('cookie-parser');
const app = express();
const axios = require('axios');

const saltRounds = 10;

app.use(express.json());
app.use(cors({
  origin:['http://localhost:5173'],
  methods:['POST','GET'],
  credentials: true
}));
app.use(ckp());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "2gether"
});



db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

app.post('/inscription', (req, res) => {
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
});

app.post('/connexion', (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) return res.json({ error: "Erreur de connexion au serveur" });
    if (data.length > 0) {
      bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
        if (err) return res.json({ error: "Erreur de comparaison de mot de passe" });
        if (response) {
          const name = data[0].name;
          const token = jwt.sign({name}, "jwt-secret-key", {expiresIn:'1d'});
          res.cookie('token',token);
          return res.json({ status: "Succes" });
        } else {
          return res.json({ error: "Email ou mot de passe incorrect" });
        }
      });
    } else {
      return res.json({ error: "Email ou mot de passe incorrect" });
    }
  });
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if(!token){
    return res.json({ error: "Vous n'êtes pas autoriré" });
  }else{
    jwt.verify(token,'jwt-secret-key', (err, decoded)=>{
      if(err){
        return  res.json({ error: "Token problem" });
      }else{
        req.name = decoded.name;
        next();
      }
    })
  }
}

app.get('/rejoindre',verifyUser, (req,res) => {
  return res.json({ Status: "Succes", name: req.name });
})

app.get('/proposer',verifyUser, (req,res) => {
  return res.json({ Status: "Succes", name: req.name });
})




app.listen(8081, () => {
  console.log('Server is running on port 8081');
});
