const express = require("express");
const app = express();
const router = express.Router();

router.use((req, res, next) => {
  console.log("URL:", req.originalUrl);
  next();
});

app.use("/router", router);

app.listen(1337, () => console.log("Web server running on port 1337"));
