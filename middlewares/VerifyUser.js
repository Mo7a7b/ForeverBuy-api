const jwt = require("jsonwebtoken")


module.exports = function verifyUser(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_WORD, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized: Invalid token" });
            }
            req.user = decoded;
            next();
        });
    } else {
        res.status(401).json({ message: "Unauthorized: No token provided" });
    }
};