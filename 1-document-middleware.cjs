const mongoose = require("mongoose");
const { connection, Schema } = mongoose;

mongoose.connect("mongodb://localhost:27017/test").catch(console.error);

// define schema
const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

// pre and post hook for the init document method

UserSchema.pre("init", async function preInit() {
  console.log("A document is going to be initialized");
});

UserSchema.post("init", async function postInit() {
  console.log("A document was initialized");
});

// pre and post validate document method
UserSchema.pre("validate", async function preValidate() {
  console.log("A document is going to be validated");
});

UserSchema.post("validate", async function postValidate() {
  console.log("All validation rules were executed");
});

// pre and post hooks for save
UserSchema.pre("save", async function preSave() {
  console.log("Preparing to save the document");
});

UserSchema.post("save", async function postSave() {
  console.log(`A doc was saved id=${this.id}`);
});

// Add pre and post hook for remove
//  (probably should be deleteOne ore deleteMany) method
UserSchema.pre("deleteOne", async function preDeleteOne() {
  console.log(`Doc with id=${this.id} will be removed`);
});

UserSchema.post("deleteOne", async function postDeleteOne() {
  console.log(`A doc with id=${this.id} was removed`);
});

// comnpile the schema into a model
const User = mongoose.model("User", UserSchema);

// establish new connection, create a document and perform saving,
// retrieving and deleting
connection.once("connected", async () => {
  try {
    const user = new User({
      firstName: "John",
      lastName: "Smith",
    });
    await user.save();
    await User.findById(user.id);
    await user.deleteOne();
    await connection.close();
  } catch (error) {
    await connection.close();
    console.dir(error.message, { colors: true });
  }
});
