import express from "express";
const app = express();

app
  .route("/home")
  .get((req, res, next) => {
    res.type("text/html");
    res.write("<!DOCTYPE html>");
    next();
  })
  .get((req, res, next) => {
    res.end(`
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>WebApp powered by ExpressJS</title>
            </head>
            <body role="application">
                <form method="post">
                    <input type="text" />
                    <button type="submit">Send</button>
                </form>
            </body>
        </html>
        `);
  })
  .post((req, res, next) => {
    res.send("Got it!");
    // console.log("Got it!!");
  });

app.listen(1337, () => console.log("Web server running on port 1337"));
