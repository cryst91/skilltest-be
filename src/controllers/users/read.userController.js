const { Users } = require("../../models");

// me user
const service = async (req, res) => {
  try {
    const users = await Users.findAll({attributes: ['name', 'gender', 'phone']})

    return res.json({
        msg: "SUCCESS",
        data: users,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.toString(),
    });
  }
};

module.exports = { service };