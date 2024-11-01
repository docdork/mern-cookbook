const mongoose = require("mongoose");
const { connection, Schema } = mongoose;

mongoose.connect("mongodb://localhost:27017/test").catch(console.error);

// create schema
const UsrSchm = new Schema({
  firstName: String,
  lastName: String,
  likes: [String],
});

// define getByFullName
UsrSchm.static("getByFullName", function getByFullName(v) {
  const fullName = String(v).split(" ");
  const lastName = fullName[0] || "";
  const firstName = fullName[1] || "";
  return this.findOne()
    .where("firstName")
    .equals(firstName)
    .where("lastName")
    .equals(lastName);
});

// compile schema into a model
const User = mongoose.model("User", UsrSchm);

// static model methods can also be defined
// using the "statics" schema property

/*
UsrSchm.statics.getByFullName = function getByFullName(v) {
  const fullName = String(v).split(" ");
  const lastName = fullName[0] || "";
  const firstName = fullName[1] || "";
  return this.findOne()
    .where("firstName")
    .equals(firstName)
    .where("lastName")
    .equals(lastName);
};
*/

// connect, create a new user and save it.
// then use "getByFullName" to look for the user
// using their full name
connection.once("connected", async () => {
  try {
    // Create
    const user = new User({
      firstName: "Jingxuan",
      lastName: "Huang",
      likes: ["kitties", "strawberries"],
    });
    await user.save();
    // Read
    const person = await User.getByFullName("Huang Jingxuan");
    console.log(JSON.stringify(person, null, 4));
    await person.deleteOne();
  } catch (error) {
    console.dir(error.message, { colors: true });
  } finally {
    await connection.close();
  }
});
