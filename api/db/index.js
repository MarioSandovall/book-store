const mongoose = require("mongoose");

const connectionString = "mongodb://127.0.0.1:27017/bookstore";

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
