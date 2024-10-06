const express = require("express");
const app = express();

const router = express.Router();

router.use((req, res, next) => {
  if (!req.query.id) {
    next("router"); //Next, out of Router
  } else {
    next(); // Next, in Router
  }
});

router.get("/", (req, res, next) => {
  const id = req.query.id;
  res.send(`You specified a user ID => ${id}`);
});

app.get("/", router, (req, res, next) => {
  res.status(400).send("A user ID needs to be specified");
});

app.listen(1337, () => console.log("Web server is running on port 1337"));
