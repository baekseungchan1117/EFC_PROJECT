const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token> 형식

    if (!token) {
        return res.status(401).json({ message: "Token required" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) {
            return res.status(401).send({ message: 'Invalid token.' });
        }
        req.user = user;
        next();
    });
}

module.exports = checkToken;
