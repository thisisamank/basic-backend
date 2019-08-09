const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleID: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  photo: {
    type: String
  }
});

mongoose.model("users", UserSchema);
