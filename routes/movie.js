import express from "express";
import mongoose from "mongoose";
import {
  createMovie,
  getAllMovies,
  deleteMovies,
} from "../controllers/movies.js";
import _authCookieToken from "../middlewares/jwtVerify.js";
import restrictTo from "../utilities/authozi.js";
const movie_router = express.Router();
const app = express();

app.use("/user", movie_router);

movie_router.post("/movies", _authCookieToken, createMovie);
movie_router.get("/movies", _authCookieToken, getAllMovies); //working
movie_router.delete("/movies", deleteMovies);

export default movie_router;
