const express = require("express");
const uuid = require("uuid");
const app = express();

// CRUD = create, read, update, delete/destroy

// Define a memory database
let data = [
  { id: uuid(), name: "Bob" },
  { id: uuid(), name: "Alice" },
];

// create a model for CRUD functions
const usr = {
  create(name) {
    const user = { id: uuid(), name };
    data.push(user);
    return user;
  },
  read(id) {
    if (id === "all") return data;
    return data.find((user) => user.id === id);
  },
  update(id, name) {
    const user = data.find((usr) => usr.id === id);
    if (!user) return { status: "User not found" };
    user.name = name;
    return user;
  },
  delete(id) {
    data = data.filter((user) => user.id !== id);
    return { status: "deleted", id };
  },
};

//request handler for post method
app.post("/users/:name", (req, res) => {
  res.status(201).json(usr.create(req.params.name));
});

// request handler for get method
app.get("/users/:id", (req, res) => {
  res.status(200).json(usr.read(req.params.id));
});

// put request handler, an Update operation.  ID needs to be provided in order to update the specific user in the data array.
app.put("/users/:id=:name", (req, res) => {
  res.status(200).json(usr.update(req.params.id, req.params.name));
});

// request handler for the delete operation
app.delete("/user/:id", (req, res) => {
  res.status(200).json(usr.delete(req.params.id));
});

// satrt app from port 1337
app.listen(1337, () => console.log("Web Server running on port 1337"));
