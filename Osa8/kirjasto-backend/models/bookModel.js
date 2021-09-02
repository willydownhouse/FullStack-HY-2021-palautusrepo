const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: [2, "Book title must be at least 2 characters"],
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  genres: [
    {
      type: String,
      enum: ["refactoring", "agile", "patterns", "design", "crime", "classic"],
    },
  ],
});

schema.plugin(uniqueValidator);
const Book = mongoose.model("Book", schema);

module.exports = Book;
