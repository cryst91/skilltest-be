const { Users } = require("../../models");
const { JWT, createJWT } = require("../../middlewares/jwt");

// me user
const service = async (req, res) => {
  try {
    const payload = req.body;
    const user = await Users.findOne({where: {email: payload.email}})

    if (!user) {
        return res.status(401).json({
            msg: "email dan password tidak cocok",
            data: [],
        });
    }

    if (user.password != payload.password) {
        return res.status(401).json({
            msg: "email dan password tidak cocok",
            data: [],
        });
    }

    tok = createJWT(user)

    return res.json({
        msg: "SUCCESS",
        token: tok,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.toString(),
    });
  }
};

module.exports = { service };