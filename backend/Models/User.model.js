const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  gender: String,
  name: Object,
  location: Object,
  email: String,
  login: Object,
  dob: Object,
  registered: Object,
  phone: String,
  cell: String,
  id: Object,
  picture: Object,
  nat: String,
  group: String,
});
const UserModel = mongoose.model("users", userSchema);

module.exports = {
  UserModel,
};
