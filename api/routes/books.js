const express = require("express");

const HTTP_CODES = require("../utils/http-codes");

const Reponse = require("../models/reponse");
const BookEntity = require("../db/entities/book-entity");

const router = express.Router();

router.get("/", async function (req, res) {
  const response = new Reponse();
  await BookEntity.find({}, (error, books) => {
    if (error) {
      response.markAsFailure("Something went wrong");
      return res.status(HTTP_CODES.INTERNAL_ERROR).json(response);
    }

    return res.status(HTTP_CODES.OK).json({ success: true, data: books });
  }).catch((error) => {
    const message = error?.message || "Internal error";
    response.markAsFailure(message);
    return res.status(HTTP_CODES.INTERNAL_ERROR).json(response);
  });
});

router.get("/:id", async function (req, res) {
  const response = new Reponse();

  await BookEntity.findOne({ _id: req.res.params.id }, (error, book) => {
    if (error) {
      response.markAsFailure("Something went wrong");
      return res.status(HTTP_CODES.INTERNAL_ERROR).json(response);
    }

    if (book) {
      response.markAsFailure("Book not found");
      return res.status(HTTP_CODES.BAD_REQUEST).json(response);
    }

    return res.status(HTTP_CODES.OK).json({ success: true, data: book });
  }).catch((error) => {
    const message = error?.message || "Internal error";
    response.markAsFailure(message);
    return res.status(HTTP_CODES.INTERNAL_ERROR).json(response);
  });
});

router.post("/", function (req, res) {
  const body = req.body;
  const response = new Reponse();

  if (!body) {
    response.markAsFailure("You must provide a book");
    return res.status(HTTP_CODES.BAD_REQUEST).json(response);
  }

  const book = new BookEntity(body);

  if (!book) {
    response.markAsFailure("You must provide a book");
    return res.status(HTTP_CODES.BAD_REQUEST).json(response);
  }

  book
    .save()
    .then(() => {
      response.markAsSuccess("Book created");
      return res.status(HTTP_CODES.CREATED).json(response);
    })
    .catch((error) => {
      const message = error?.message || "Internal error";
      response.markAsFailure(message);
      return res.status(HTTP_CODES.INTERNAL_ERROR).json(response);
    });
});

router.put("/:id", async function (req, res) {
  const body = req.body;
  const response = new Reponse();

  if (!body) {
    response.markAsFailure("You must provide a book to update");
    return res.status(HTTP_CODES.BAD_REQUEST).json(response);
  }

  await BookEntity.findOne({ _id: req.params.id }, (error, book) => {
    if (error) {
      response.markAsSuccess("Book not found");
      return res.status(HTTP_CODES.NOT_FOUND).json(response);
    }

    book.name = body.name;

    book
      .save()
      .then(() => {
        response.markAsSuccess("Book updated");
        return res.status(HTTP_CODES.OK).json(response);
      })
      .catch((error) => {
        const message = error?.message || "Internal error";
        response.markAsFailure(message);
        return res.status(HTTP_CODES.INTERNAL_ERROR).json(response);
      });
  });
});

router.delete("/:id", async function (req, res) {
  const response = new Reponse();

  await BookEntity.findOneAndDelete({ _id: req.params.id }, (error, book) => {
    if (error) {
      response.markAsFailure("Something went wrong");
      return res.status(HTTP_CODES.INTERNAL_ERROR).json(response);
    }

    if (book) {
      response.markAsFailure("Book not found");
      return res.status(HTTP_CODES.BAD_REQUEST).json(response);
    }

    response.markAsSuccess("Book deleted");
    return res.status(HTTP_CODES.OK).json(response);
  }).catch((error) => {
    const message = error?.message || "Internal error";
    response.markAsFailure(message);
    return res.status(HTTP_CODES.INTERNAL_ERROR).json(response);
  });
});

module.exports = router;
