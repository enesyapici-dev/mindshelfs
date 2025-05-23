import express, { request, response } from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import Movie from "./models/Moviemodel.js";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to mindshelfs");
});

//post movie
app.post("/movies", async (request, response) => {
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
    const newMovie = {
      title: request.body.title,
      poster_path: request.body.poster_path,
      director: request.body.director,
      release_date: request.body.release_date,
      vote_average: request.body.vote_average,
      duration: request.body.duration,
      isWatched: request.body.isWatched,
    };
    const movie = await Movie.create(newMovie);
    return response.status(201).send(movie);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get all movies
app.get("/movies", async (request, response) => {
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
app.get("/movies/:id", async (request, response) => {
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
app.put("/movies/:id", async (request, response) => {
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
app.delete("/movies/:id", async (request, response) => {
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
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app connected to db");
    app.listen(PORT, () => {
      console.log(`app listening on port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
