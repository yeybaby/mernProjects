const mongoose = require('mongoose');

//create variable schema for mongoose schema
const schema = mongoose.Schema;

const todoSchema = new schema({
  item: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("todo", todoSchema);