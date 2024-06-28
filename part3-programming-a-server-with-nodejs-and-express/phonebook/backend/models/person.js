const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const URL = process.env.MONGODB_URL;

// MongoDB Connection
mongoose
  .connect(URL)
  .then(() => console.log("MongoDB Connected!"))
  .catch((error) => console.log("Something went wrong. Error:", error));

const personSchema = mongoose.Schema({
  id: String,
  name: String,
  phone: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
