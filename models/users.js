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
  seguidores: {
    type: String,
    required: false,
  },
  seguindo: {
    type: String,
    required: false,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

module.exports = mongoose.model("users", userSchema)
