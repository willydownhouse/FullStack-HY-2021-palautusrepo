const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [4, "Author name must be at least 4 characters"],
  },
  born: {
    type: Number,
  },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book", default: [] }],
});

schema.plugin(uniqueValidator);
const Author = mongoose.model("Author", schema);

module.exports = Author;
