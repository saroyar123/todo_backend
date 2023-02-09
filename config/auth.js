const User = require("../model/user");
const jwt = require("jsonwebtoken");

exports.Authitication = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if(!token)
    {
        return res.status(404).json({
            success:false,
            message:"login first"
        })
    }

    const email = jwt.verify(token, "saroyarhossain");

    const user = await User.findOne({ email: email.email });
    req.user = user;
    next();
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
