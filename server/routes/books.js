const express = require("express");

const HTTP_STATUS_CODE = require("../utils/http-status-code ");

const Reponse = require("../models/reponse");
const BookEntity = require("../db/entities/book-entity");
const Book = require("../models/book");
const router = express.Router();

router.get("/", async function (req, res) {
  const response = new Reponse();
  await BookEntity.find({}, (error, bookEntities) => {
    if (error) {
      response.markAsFailure("Something went wrong");
      return res.status(HTTP_STATUS_CODE.INTERNAL_ERROR).json(response);
    }

    const books = bookEntities.map((entity) => {
      const model = new Book();

      model.id = entity._id;
      model.title = entity.title;
      model.description = entity.description;
      model.genre = entity.genre;
      model.author = entity.author;
      model.price = entity.price;
      model.stock = entity.stock;

      return model;
    });

    return res.status(HTTP_STATUS_CODE.OK).json({ success: true, books });
  }).catch((error) => {
    response.markAsFailure("Internal error");
    return res.status(HTTP_STATUS_CODE.INTERNAL_ERROR).json(response);
  });
});

router.get("/:id", async function (req, res) {
  const response = new Reponse();
  await BookEntity.findOne({ _id: req.params.id }, (error, book) => {
    if (error) {
      response.markAsFailure("Something went wrong");
      return res.status(HTTP_STATUS_CODE.INTERNAL_ERROR).json(response);
    }

    if (book) {
      response.markAsFailure("Book not found");
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(response);
    }

    return res.status(HTTP_STATUS_CODE.OK).json({ success: true, data: book });
  }).catch((error) => {
    response.markAsFailure("Internal error");
    return res.status(HTTP_STATUS_CODE.INTERNAL_ERROR).json(response);
  });
});

router.post("/", function (req, res) {
  const body = req.body;
  const response = new Reponse();

  if (Object.keys(body).length === 0) {
    response.markAsFailure("You must provide a book");
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(response);
  }

  const book = new BookEntity(body);

  if (!book) {
    response.markAsFailure("You must provide a book");
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(response);
  }

  book
    .save()
    .then(() => {
      response.markAsSuccess("Book created");
      return res.status(HTTP_STATUS_CODE.CREATED).json(response);
    })
    .catch((error) => {
      response.markAsFailure("Internal error");
      return res.status(HTTP_STATUS_CODE.INTERNAL_ERROR).json(response);
    });
});

router.put("/:id", async function (req, res) {
  const body = req.body;
  const response = new Reponse();

  if (Object.keys(body).length === 0) {
    response.markAsFailure("You must provide a book to update");
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(response);
  }

  await BookEntity.findOne({ _id: req.params.id }, (error, book) => {
    if (error) {
      response.markAsSuccess("Book not found");
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json(response);
    }

    book.title = body.title;
    book.description = body.description;
    book.genre = body.genre;
    book.author = body.author;
    book.price = body.price;
    book.stock = body.stock;

    book
      .save()
      .then(() => {
        response.markAsSuccess("Book updated");
        return res.status(HTTP_STATUS_CODE.OK).json(response);
      })
      .catch((error) => {
        response.markAsFailure("Internal error");
        return res.status(HTTP_STATUS_CODE.INTERNAL_ERROR).json(response);
      });
  });
});

router.delete("/:id", async function (req, res) {
  const response = new Reponse();

  await BookEntity.findOneAndDelete({ _id: req.params.id }, (error, book) => {
    if (error) {
      response.markAsFailure("Something went wrong");
      return res.status(HTTP_STATUS_CODE.INTERNAL_ERROR).json(response);
    }

    if (!book) {
      response.markAsFailure("Book not found");
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(response);
    }

    response.markAsSuccess("Book deleted");
    return res.status(HTTP_STATUS_CODE.OK).json(response);
  }).catch((error) => {
    response.markAsFailure("Internal error");
    return res.status(HTTP_STATUS_CODE.INTERNAL_ERROR).json(response);
  });
});

module.exports = router;
