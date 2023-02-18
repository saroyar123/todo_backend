const express = require("express");
const { databaseconnect } = require("./database/moncon");
const cookieparser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./routes/route");

dotenv.config();

const app = express();
databaseconnect();
app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: ["https://todolist-f5k4.onrender.com"],
  })
);

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://todolist-f5k4.onrender.com"
  ); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "server is running",
  });
});

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`server runing on port ${process.env.PORT}`);
});
