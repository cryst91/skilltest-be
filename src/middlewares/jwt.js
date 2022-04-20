const jwt = require("jsonwebtoken");

function createJWT(user) {
    const token = jwt.sign({ user: user.dataValues }, "private-key", { expiresIn: "24h" });
    return token;
}

function checkToken(req, res, next) {
    const token = req.get("Authorization");
    if (!token)
        return res.status(401).json({ msg: "Unauthorized." });

    jwt.verify(token, "private-key", async (err, decode) => {
        if (err)
            return res.status(401).json({ msg: err.message }); else {
            req.auth = decode.user;
            next();
        }
    });
}

module.exports = { createJWT, checkToken };