const mongoose = require("mongoose");
const { connection, Schema } = mongoose;

mongoose.connect("mongodb://localhost:27017/test").catch(console.error);

// Define the schema
const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  likes: [String],
});

// define a document instance method for setting a user's
// first name and last name from a string containing the full name.
UserSchema.method("setFullName", function setFullName(v) {
  const fullName = String(v).split(" ");
  this.lastName = fullName[0] || "";
  this.firstName = fullName[1] || "";
});

// define a document instance for getting a user's full name concatenating the
// first name and last name
UserSchema.method("getFullName", function getFullName() {
  return `${this.lastName} ${this.firstName}`;
});

// define a document instance method named loves that will expect one argument
// that will add to the likes array of strings.
UserSchema.method("loves", function lives(stuff) {
  this.likes.push(stuff);
});

// define a document instance method
UserSchema.method("dislikes", function dislikes(stuff) {
  this.likes = this.likes.filter((str) => str !== stuff);
});

// compile the Schema into a model
const User = mongoose.model("User", UserSchema);

// Once Mongoose is connected to the database, create a new user and use setFullName
// method to populate the field firtName and lastName, then use the loves method to
// populate the likes array.
// Next, use chaining syntax to query for the user in the collection and use the dislikes
// method to remove "snake" from the likes array.
connection.on("connected", async () => {
  try {
    // Create
    const user = new User();
    user.setFullName("Huang Jingxuan");
    user.loves("kitties");
    user.loves("stawberries");
    user.loves("snakes");
    await user.save();
    // Update
    const person = await User.findOne()
      .where("firstName", "Jingxuan")
      .where("likes")
      .in(["snakes", "kitties"]);
    person.dislikes("snakes");
    await person.save();
    // Display
    console.log(person.getFullName());
    console.log(JSON.stringify(person, null, "....."));
    // Remove, use .deleteOne or .deleteMany instead of .remove
    await user.deleteOne();
    console.log("Deleted");
  } catch (error) {
    console.dir(error.message, { colors: true });
  } finally {
    await connection.close();
  }
});
