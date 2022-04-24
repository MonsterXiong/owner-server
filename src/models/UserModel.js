const mongoose = require("../db/mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    age: Number,
    password: String,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("UserModel", userSchema);

module.exports = {
  UserModel,
};
