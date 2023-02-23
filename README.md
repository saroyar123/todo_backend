```
This is the backend of the To-Do-List project
```


## Routes



```

get("api/", (req, res) => {
    res.status(200).json({
      success: true,
      message: "server is running",
    });
  });

post("/api/login", login);
post("/api/register", register);  
get("/api/logout", Authitication, logout);  
delete("/api/deleteAccount", Authitication, deleteAccount);  
post("/api/addTask", Authitication, addTasks);
delete("/api/deleteTask/:id", Authitication, deleteTask);
get("/api/getUserData", Authitication, getUserData);
```

## Authentication
```
For authentication of the user JWT token-based authentication is used.
```
```
Deploy:https://todo-backend-66o7.onrender.com
```
