import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";

import moviesRoute from "./routes/moviesRoute.js";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to mindshelfs");
});

app.use("/movies", moviesRoute);
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
