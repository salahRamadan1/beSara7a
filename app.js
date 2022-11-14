const express = require("express");
const { deConnection } = require("./dataBaseConnection/dataBaseConnectiondb");
const app = express();
const cor = require("cors");
const globalHandler = require("./utils/globalHandler");
app.use(cor());
require("dotenv").config();
app.use(express.json());
app.use("/user", require("./API/userApi"));
app.use("/message", require("./API/messageApi"));



app.use("*", (req, res) => {
  res.json({ message: " the url is incorrect" });
});
app.all("*", (req, res, next) => {
  next(
    new AppError(` can't find this route : ${req.originalUrl} on server `, 404)
  );
});
app.use(globalHandler);
deConnection();
app.listen(9000, () => {
  console.log("server is running");
});
