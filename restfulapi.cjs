const express = require("express");
const uuid = require("uuid");
const app = express();

let data = [
  { id: uuid(), name: "Bob" },
  { id: uuid(), name: "Alice" },
];

const usr ={
    create(name) {
        const user = {id: uuid(), name}
        data.push(user)
        return user
    },
    
}