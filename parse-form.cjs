const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.get("/", (req, res, next) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>WebApp powered by ExpressJS</title>
        </head>
        <body>

            <div role="application">
                <form method="post" action="/setdata">
                <input name="urlencoded" type="text">
                <button type="submit">Send</button>
                </form>
                <form method="post" action="/setdata" enctype="text/plain">
                <input name="txtencoded" type="text">
                <button type="submit">Send</button>
                </form>
            </div>

        </body>
        </html>
        `);
});

app.post("/setdata", (req, res, next) => {
  console.log(req.body), res.end();
});

app.listen(1337, () => console.log("Web Server running on port 1337"));
