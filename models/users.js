const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: {
    type: Number,
    required: true,
    default: 0,
  },
  following: {
    type: Number,
    required: true,
    default: 0,
  },
  bio: {
    type: String,
    required: false,
    default: "",
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

module.exports = mongoose.model("users", userSchema)
