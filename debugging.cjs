const express = require("express");
const app = express();

app.get("*", (req, res, next) => {
  res.send("Hello there!");
});

app.listen(1337, () => console.log("Web server running on port 1337"));
