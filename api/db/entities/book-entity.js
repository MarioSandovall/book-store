const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BookEntity = new Schema(
  {
    name: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('books', BookEntity)