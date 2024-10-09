const express = require("express");
const vhost = require("vhost");
const app = express();

const users = express.Router();
users.get("/", (req, res, next) => {
  const username = req.vhost[0]
    .split("-")
    .map((name) => name[0].toUpperCase() + name.slice(1))
    .join(" ");
  res.send(`Hello, ${username}`);
});

app.use(vhost("*.localhost", users));

app.listen(1337, () => console.log("Web Server running on port 1337"));
