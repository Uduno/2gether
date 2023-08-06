const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ error: "Vous n'êtes pas autorisé" });
    } else {
        jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
            if (err) {
                return res.json({ error: "Token expiré ou invalide" });
            } else {
                req.id = decoded.id;
                next();
            }
        });
    }
};

module.exports = verifyUser;