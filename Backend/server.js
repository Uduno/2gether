const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const apiRoutes = require('./routes/users');

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['POST', 'GET'],
  credentials: true
}));
app.use(cookieParser());

app.use('/api', apiRoutes);


app.use((err, req, res, next) => {
  console.error('Erreur interne du serveur :', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(8081, () => {
  console.log('Server is running on port 8081');
});
