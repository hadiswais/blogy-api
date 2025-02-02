const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decodedToken;
        if (req.userData.role === 1) {
            next();
        } else {
            return res.status(401).json({
                message: "Access not allowed",
            });
        }
    } catch (e) {
        return res.status(401).json({
            message: "Invalid or expired token provided",
            error: e
        });
    }
};