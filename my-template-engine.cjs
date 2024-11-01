const express = require("express");
const fs = require("fs"); //file system
const { title } = require("process");
const app = express();

app.engine("tpl", (filepath, options, callback) => {
  fs.readFile(filepath, (err, data) => {
    if (err) {
      return callback(err);
    }
    const content = data.toString().replace(/%[a-z]+%/gi, (match) => {
      const variable = match.replace(/%/g, "");
      if (Reflect.has(options, variable)) {
        return options[variable];
      }
      return match;
    });
    return callback(null, content);
  });
});

app.set("views", "./views");

app.set("view engine", "tpl");

app.get("/", (req, res, next) => {
  res.render("home", {
    title: "Hello",
    description: "World!",
  });
});

app.listen(1337, () => console.log("Web server running on port 1337"));
