const User = require("../model/user");
const jwt = require("jsonwebtoken");

exports.Authitication = async (req, res, next) => {
  try {
    const { token } = req.params;
    console.log(token);

    if(!token)
    {
        return res.status(404).json({
            success:false,
            message:"login first"
        })
    }

    const email = jwt.verify(token,process.env.jwt_private_key);

    const user = await User.findOne({ email: email.email });

    if(!user)
    {
        return res.status(404).json({
            success:false,
            message:"login first"
        })
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
