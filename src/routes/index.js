const express = require("express");
const app = express();

app.use("/usuario", require("./usuarios"));


module.exports = app;
