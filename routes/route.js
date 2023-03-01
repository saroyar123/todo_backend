const { Authitication }=require("../config/auth");
const { addTasks, deleteAccount, deleteTask, getUserData, login, logout, register }=require("../controller/userFuntions");
const express=require("express")
router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      message: "server is running",
    });
  });
router.post("/login", login);
router.post("/register", register);
router.get("/logout/:token", Authitication, logout);
router.delete("/deleteAccount/:token", Authitication, deleteAccount);
router.post("/addTask/:token", Authitication, addTasks);
router.delete("/deleteTask/:id/:token", Authitication, deleteTask);
router.get("/getUserData/:token", Authitication, getUserData);

module.exports=router;