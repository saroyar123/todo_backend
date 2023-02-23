const express = require("express");
const { databaseconnect } = require("./database/moncon");
const cookieparser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./routes/route");

dotenv.config();

const app = express();
databaseconnect();
app.use(cors())
app.use(express.json());
app.use(cookieparser());

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
