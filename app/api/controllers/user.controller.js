// Cargamos el modelo 
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

const createUser = async (req, res, next) => {
  try {
    const newUser = new User();
    newUser.name = req.body.name;
    newUser.emoji = req.body.emoji;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.favPalettes = [];

    
    const userDb = await newUser.save();
    

    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: null
    });
  } catch (err) {
    return next(err);
  }
}

const authenticate = async (req, res, next) => {

  try {
    const userInfo = await User.findOne({ email: req.body.email })
    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
      userInfo.password = null
      const token = jwt.sign(
        {
          id: userInfo._id,
          name: userInfo.name
        },
        req.app.get("secretKey"),
        { expiresIn: "1h" }
      );
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { user: userInfo, token: token },
      });
    } else {
      return res.json({ status: 400, message: HTTPSTATUSCODE[400], data: null });
    }
  } catch (err) {
    return next(err);
  }
}
const logout = (req, res, next) => {
  try {
		req.headers.authorization = null;
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      token: null
    });
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  createUser,
  authenticate,
  logout
}