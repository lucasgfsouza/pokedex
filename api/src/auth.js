const jwt = require('jsonwebtoken');

const secret = 'pokedex_clearsale'

function generateToken(userId) {
    const payload = { id: userId };
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, secret, options)
}


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send('Access denied');
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }
        req.user = user;
        next();
    });
}

function getUserIdFromToken(req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, secret);
    const userId = decodedToken.id;

    return userId
}

module.exports = { generateToken, secret, authenticateToken, getUserIdFromToken };