const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  try {
    throw new Error("Oh no!, something went wrong!");
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.end(err.message);
});

app.listen(1337, () => console.log("Web server running on port 1337"));
