const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    max: 500,
  },
  name: {
    type: String,
    required: true,
    min: 1,
  },

  content: {
    type: String,
    required: true,
    min: 1,
  },
});

module.exports = mongoose.model("list", userSchema, "list");
