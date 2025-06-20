import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import moviesRoute from "./routes/moviesRoute.js";
import booksRoute from "./routes/bookRoute.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to mindshelfs");
});

app.use("/movies", moviesRoute);
app.use("/books", booksRoute);

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
