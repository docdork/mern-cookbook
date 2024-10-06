import express from "express";
const app = express();

app.get("/one", (req, res, next) => {
  res.type("text/plain");
  res.write("Hello ");
  next();
});

app.get("/one", (req, res, next) => {
  res.status(200).end("World!");
});

app.get(
  "/two",
  (req, res, next) => {
    res.type("text/plain");
    res.write("Hello ");
    next();
  },
  (req, res, next) => {
    res.status(200).end("Moon!");
  }
);

app.listen(1337, () => console.log("Web Server running on port 1337"));
