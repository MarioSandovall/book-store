const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BookEntity = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    genre: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('books', BookEntity)
