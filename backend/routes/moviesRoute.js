import express from "express";
import Movie from "../models/Moviemodel.js";

const router = express.Router();

//post movie
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.tmdb_id ||
      !request.body.title ||
      !request.body.poster_path ||
      !request.body.director ||
      !request.body.release_date ||
      !request.body.vote_average ||
      !request.body.duration ||
      !request.body.actors ||
      !request.body.userStats ||
      typeof request.body.userStats.isWatched === "undefined"
    ) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }
    if (
      request.body.userStats.isWatched === true &&
      (!request.body.userStats.userRating || !request.body.userStats.watchDate)
    ) {
      return response.status(400).send({
        message: "Watched movies must have userRating and watchDate",
      });
    }
    const newMovie = {
      tmdb_id: request.body.tmdb_id,
      title: request.body.title,
      poster_path: request.body.poster_path,
      director: request.body.director,
      release_date: request.body.release_date,
      vote_average: request.body.vote_average,
      duration: request.body.duration,
      actors: request.body.actors,
      userStats: {
        isWatched: request.body.userStats.isWatched,
        userRating: request.body.userStats.userRating,
        watchDate: request.body.userStats.watchDate,
      },
    };
    const movie = await Movie.create(newMovie);
    return response.status(201).send(movie);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get all movies
router.get("/", async (request, response) => {
  try {
    const movies = await Movie.find({});

    return response.status(200).json({
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get one movie
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const movie = await Movie.findById(id);

    return response.status(200).json(movie);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//update movie
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.poster_path ||
      !request.body.director ||
      !request.body.release_date ||
      !request.body.vote_average ||
      !request.body.duration ||
      !request.body.isWatched
    ) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }
    const { id } = request.params;

    const result = await Movie.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).send({ message: "Movie not found" });
    }
    return response.status(200).send({ message: "Movie updated" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//delete movie
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Movie.findByIdAndDelete(id, request.body);

    if (!result) {
      return response.status(404).send({ message: "Movie not found" });
    }
    return response.status(200).send({ message: "Movie deleted" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
