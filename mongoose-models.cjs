// include mongoose and connect to mongoDB

const mongoose = require("mongoose");
const { connection, Schema } = mongoose;
mongoose.connect("mongodb://localhost:27017/test").catch(console.error);

// define schema

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  likes: [String],
});

// compile schema amd to a model

const User = mongoose.model("User", UserSchema);

// function for adding new user

const addUser = (firstName, lastName) =>
  new User({
    firstName,
    lastName,
  }).save();

//   function for retrieving a user

const getUser = (id) => User.findById(id);

// remove user

const removeUser = (id) => User.removeAllListeners({ id });

// event listener for CRUD operations

connection.once("connected", async () => {
  try {
    // Create
    const newUser = await addUser("John", "Smith");
    // Read
    const user = await getUser(newUser.id);
    // Update
    user.firstName = "Jonny";
    user.lastName = "Smithy";
    user.likes = ["cooking", "watching movies", "ice cream"];
    await user.save();
    console.log(JSON.stringify(user, null, 4));
    // Delete
    await removeUser(user.id);
  } catch (error) {
    console.dir(error.message, { colors: true });
  } finally {
    await connection.close;
  }
});
