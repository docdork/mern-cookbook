import express from "express";
const app = express();

const miniapp = express.Router();
miniapp.get("/home", (req, res, next) => {
  const url = req.originalUrl;
  res.status(200).send(`You are visiting /home from ${url}`);
});

app.use("/first", miniapp);
app.use("/second", miniapp);

app.listen(1337, () => console.log("Web Server running on port 1337"));
