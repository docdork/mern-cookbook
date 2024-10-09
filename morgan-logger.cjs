const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.get("*", (req, res, next) => {
  res.send("Hello Morgan!");
});

app.listen(1337, () => console.log("Web Server running on port 1337"));
