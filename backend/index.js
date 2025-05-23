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
