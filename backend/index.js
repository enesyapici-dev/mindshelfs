import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";

const app = express();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to mindshelfs");
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
