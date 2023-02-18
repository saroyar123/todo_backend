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
router.get("/logout", Authitication, logout);
router.delete("/deleteAccount", Authitication, deleteAccount);
router.post("/addTask", Authitication, addTasks);
router.delete("/deleteTask/:id", Authitication, deleteTask);
router.get("/getUserData", Authitication, getUserData);

module.exports=router;