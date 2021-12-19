const Jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        Jwt.verify(token, process.env.SECRETTOKEN, (err, payload) => {
            if (err) return res.status(403).json("Token is not valid");

            req.user = payload;
            next();
        })
    } else {
        res.status(401).json("Your are not authenticated");
    }
}

module.exports = verify;