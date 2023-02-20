const User = require("../model/user");
const Task = require("../model/task");
const jwt = require("jsonwebtoken");

// login user
exports.login = async (req, res) => {
  try {
    const password = req.body.password;
    const email = req.body.email;

    const user = await User.findOne({ email: email }).populate("todolist");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Register first",
      });
    }

    if (user && user.password !== password) {
      return res.status(404).json({
        success: false,
        message: "wrong password",
      });
    }

    const token = jwt.sign({ email: email },process.env.jwt_private_key);

    user.token = token;

    const option = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly:true,
      secure:true,
      sameSite:'None',
      // domain:"https://todolist-f5k4.onrender.com"
    };

    // console.log(req.user);

    res.cookie("token", token, option).status(200).json({
      success: true,
      message: "you are login",
      Token:token
  
    });
  } catch (error) {
    await res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// for register in our todo list
exports.register = async (req, res) => {
  try {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;

    if (!name || !password || !email) {
      return res.status(404).json({
        success: false,
        message: "gives all inputs",
      });
    }

    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(404).json({
        success: true,
        message: "user already exist",
      });
    }

    // console.log(process.env.jwt_private_key);
    const newUser = await User.create({
      name: name,
      password: password,
      email: email,
    });

    const token = jwt.sign({ email: email },process.env.jwt_private_key);

    newUser.token = token;
    await newUser.save();

    const option = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly:true,
      secure:true,
      sameSite:'None'
    };

    res.status(200).cookie("token", token, option).json({
      success: true,
      message: "user created",
      Token:token
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// logout account

exports.logout = async (req, res) => {
  try {
    // console.log(req.user);
    const user = await User.findOne({ email: req.user.email });

    if (!user) {
      return res.status(200).json({
        success: false,
        message: "login first",
      });
    }

    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "you are logout successfully",
      });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// delete account parmanenetly

exports.deleteAccount = async (req, res) => {
  try {
    const user = req.user;
    const todolist=user.todolist;
   
    todolist.map(async(task,index)=>{
      const deleteTask=await Task.findOne(task._id);
      await deleteTask.remove();
    })
  

    // console.log("account deleted")

    await user.remove();

    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: false,
        message: "your account is deleted",
      });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// add your task in todolist

exports.addTasks = async (req, res) => {
  try {
    const user = req.user;

    const { title, description } = req.body;
    // console.log(title);
    // console.log(description);

    if ((!title, !description)) {
      return res.status(404).json({
        success: false,
        message: "please provide all data",
      });
    }
    const task = await Task.create({
      title: title,
      description: description
    });
    await task.save();

    user.todolist.push(task._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: "your task is added",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// delete task of the user

exports.deleteTask = async (req, res) => {
  try {
    const userId = req.params.id;

    const task = await Task.findById(userId);
    await task.remove();

    const user = req.user;
    const index = await user.todolist.indexOf(userId);

    if (!index) {
      return res.status(200).json({
        success: false,
        message: "your data not exists",
      });
    }

    await user.todolist.splice(index, 1);
    await user.save();

    res.status(200).json({
      success: true,
      message: "your task is deleted",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// get user data

exports.getUserData = async (req, res) => {
  try {
    const user = await User.findOne(req.user).populate("todolist");

    if(!user){
      return res.status(404).json({
        success:false,
        message:"you are not authiticated"
      })
    }
    user.password=null;

    res.status(200).json({
      success: true,
      message:"user data",
      user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

