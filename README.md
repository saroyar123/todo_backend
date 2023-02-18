routes --

router.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      message: "server is running",
    });
  });

<!-- for login -->
router.post("/login", login);

<!-- for register -->
router.post("/register", register);

<!-- for logout -->
router.get("/logout", Authitication, logout);

<!-- for delete account -->
router.delete("/deleteAccount", Authitication, deleteAccount);

<!-- for add task -->
router.post("/addTask", Authitication, addTasks);

<!-- for delete task -->
router.delete("/deleteTask/:id", Authitication, deleteTask);

<!-- for get user all -->
router.get("/getUserData", Authitication, getUserData);
