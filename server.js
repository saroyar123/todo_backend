const express=require("express");
const { Authitication } = require("./config/auth");
const { login, register, logout, deleteAccount, addTasks, deleteTask, getUserData, authenticate } = require("./controller/userFuntions");
const {databaseconnect}=require("./database/moncon");
const User=require("./model/user");
const cookieparser=require("cookie-parser");
// const dotenv=require("dotenv");
const dotenv=require('dotenv');
const cors=require('cors');

dotenv.config();

databaseconnect();

const app=express();
app.use(express.json());
app.use(cookieparser());
app.use(cors());

const router=express.Router();

router.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        message:"server is running"
    })
})
router.post("/login",login);
router.post("/register",register);
router.get("/logout",Authitication,logout);
router.delete("/deleteAccount",Authitication,deleteAccount);
router.post("/addTask",Authitication,addTasks);
router.delete("/deleteTask/:id",Authitication,deleteTask);
router.get("/getUserData",Authitication,getUserData);

app.use("/api",router);

app.listen(process.env.PORT||1234,()=>{
    console.log("server is running at port 4000")
})