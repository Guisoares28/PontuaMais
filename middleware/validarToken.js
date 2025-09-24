require('dotenv').config();
const jwt = require("jsonwebtoken");

async function validarToken(req, res, next){
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ erro: "Token não fornecido" });
    }

    // Geralmente o token vem como "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ erro: "Token inválido" });
    }

    try {
        // Verifica o token usando a chave secreta do .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Guarda os dados do usuário no req para usar depois
        req.user = decoded;

        next(); // token válido, continua para a rota
    } catch (erro) {
        return res.status(403).json({ erro: "Token expirado ou inválido" });
    }
}

module.exports = { validarToken };