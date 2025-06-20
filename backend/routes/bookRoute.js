import express from "express";
import Book from "../models/Bookmodel.js";

const router = express.Router();

//post book
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.google_books_id ||
      !request.body.title ||
      !request.body.cover_image_url ||
      !request.body.author ||
      !request.body.published_date ||
      !request.body.userStats ||
      typeof request.body.isRead === "undefined"
    ) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }
    if (
      request.body.isRead === true &&
      (!request.body.userStats.userRating || !request.body.userStats.watchDate)
    ) {
      return response.status(400).send({
        message: "Read books must have userRating and watchDate",
      });
    }
    const newBook = {
      google_books_id: request.body.google_books_id,
      title: request.body.title,
      cover_image_url: request.body.cover_image_url,
      author: request.body.author,
      published_date: request.body.published_date,
      isRead: request.body.isRead,
      userStats: {
        userRating: request.body.userStats.userRating,
        watchDate: request.body.userStats.watchDate,
      },
    };
    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get all books
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get one book
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//update book
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//delete book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).send({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book deleted" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
