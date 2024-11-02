const mongoose = require("mongoose");
const { connection, Schema } = mongoose;

mongoose.connect("mongodb://localhost:27017/test").catch(console.error);

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

// pre count
UserSchema.pre("countDocuments", async function preCountDocuments() {
  console.log(
    `Preparing to count document with this criteria:
		${JSON.stringify(this._conditions)}`
  );
});

// count
UserSchema.post("countDocuments", async function postCountDocuments(count) {
  console.log(`Counted ${count} documents that coincide`);
});

//pre find
UserSchema.pre("find", async function preFind() {
  console.log(
    `Preparing to find all documents with criteria:
		${JSON.stringify(this._conditions)}`
  );
});

//find
UserSchema.post("find", async function postFind(docs) {
  console.log(`Found ${docs.length} documents`);
});

// pre findOne
UserSchema.pre("findOne", async function prefOne() {
  console.log(
    `Preparing to find one document with criteria:
		${JSON.stringify(this._conditions)}`
  );
});

//findOne
UserSchema.post("findOne", async function postfOne(doc) {
  console.log(`Found 1 document:`, JSON.stringify(doc));
});

// pre update
UserSchema.pre("updateOne", async function preUpdateOne() {
  console.log(
    `Preparing to update all documents with criteria:
		${JSON.stringify(this._conditions)}`
  );
});

//update
UserSchema.post("updateOne", async function postUpdate(r) {
  console.log(`${r.matchedCount} document(s) were updated`);
});

const User = mongoose.model("User", UserSchema);

connection.once("connected", async () => {
  try {
    const user = new User({
      firstName: "John",
      lastName: "Smith",
    });
    await user.save();
    await User.where("firstName")
      .equals("John")
      .updateOne({ lastName: "Anderson" });
    await User.findOne().select(["lastName"]).where("firstName").equals("John");
    await User.find().where("firstName").equals("John");
    await User.where("firstName").equals("Neo").countDocuments();
    await User.where("firstName").equals("John").deleteMany();
  } catch (error) {
    console.dir(error, { colors: true });
  } finally {
    await connection.close();
  }
});
