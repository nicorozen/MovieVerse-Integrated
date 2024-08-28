const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    // const token = req.headers.jwt && req.headers.jwt.split(' ')[1];
    const token = req.headers.jwt;
    let formattedToken = null;

    if(token){
        formattedToken = token.replace('"', '');
    }
    
    if (formattedToken) {
        jwt.verify(formattedToken, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            req.user = user.id;
            next();
        });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authenticateJWT;
