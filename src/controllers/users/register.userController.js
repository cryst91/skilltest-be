const { body } = require("express-validator");
const { Users } = require("../../models");

const service = async (req, res) => {
  try {
    const payload = req.body;
    const requestDB = await Users.create(payload);

    return res.json({
      msg: "User registered successfully",
      data: requestDB,
    });
  } catch (error) {
    return res.status(400).json({
        msg: error.toString(),
    });
  }
};

const validation = [
    body('name').notEmpty().withMessage('Nama tidak boleh kosong'),
    body('address').notEmpty().withMessage('Alamat tidak boleh kosong'),
    body('phone').notEmpty().withMessage('Telepon tidak boleh kosong').isLength({min:10, max: 13}).withMessage('Telepon tidak valid'),
    body('gender').notEmpty().withMessage('Jenis Kelamin tidak boleh kosong').custom(
        value => {
            return value != 'laki-laki' && value != 'perempuan'
        }
    ).withMessage('Jenis Kelamin harus laki-laki atau perempuan'),
    body('email').notEmpty().withMessage('Email tidak boleh kosong').isEmail().withMessage('Email tidak valid').custom(
        value => {
            return Users.findOne({where: {email: value}}).then(data =>{
                if(data) {
                    return Promise.reject('Email sudah digunakan')
                }
            }).catch(function(error){
                throw(error)
                }
            )
        }
    ),
    body('password').notEmpty().withMessage('Password tidak boleh kosong').isLength({min:8, max: undefined}).withMessage('Password minimal 8 karakter'),
]

module.exports = { service, validation };