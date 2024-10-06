// import express from "express";
// import logger from "./middleware-logger.js";

const express = require("express");
const loggerMiddleware = require("./middleware-logger.cjs");

const app = express();

app.use(
  loggerMiddleware({
    enable: true,
  })
);

app.listen(1337, () => console.log("Web Server running on port 1337"));
