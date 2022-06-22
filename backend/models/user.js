const mongoose = require("mongoose");

const hikeSchema = new mongoose.Schema({
  title: { type: String, required: true }, //empty string NONO!
  description: { type: String, required: false },
  start: { type: String, required: true }, //we assume that all stamps are collected between the start and end
  end: { type: String, required: true },
  date: {type: Date, required: true}
});

const userSchema = new mongoose.Schema({
  username: { type: String }, //empty string NONO!  !!unique
  providers: {
    google: { type: String, sparse: true, unique: true },
    oid: { type: String, sparse: true, unique: true },
    github: { type: String, sparse: true, unique: true }
  },
  hikes: [hikeSchema], //empty list as default
});

const User = mongoose.model("user", userSchema);

module.exports = User;
