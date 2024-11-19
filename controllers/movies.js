import express from "express";
import mongoose from "mongoose";
import Movies from "../models/moviesModel.js";
import Users from "../models/usersModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const originalId = null

const createMovie = async (req, res) => {
  try {
    const { username, movie } = req.body;
    const userToken = req.cookies.authcookie;
    
    const decodedToken = jwt.verify(userToken, process.env.jwtPass);
    originalId = decodedToken;

    console.log("user token decode", originalId.role);

    // console.log(originalId);
    // const newMovie = new Movies({
    //   ...movie,
    //   createdBy: { userToken: req.cookies.authcookie},
    // });
    // const savedMovie = await newMovie.save();
    // const id = savedMovie._id;
    // console.log(`Id of cuurent movie is ${id}`);

   
    // await Users.findOneAndUpdate(
    //   { username: username },
    //   { $push: { movies: id } },
    //   { new: true }
    // );
    // res.status(201).json({
    //   movie: savedMovie,
    // });
  } catch (error) {
    res.status(400).json({
      error: `Error creating movie: ${error.message}`,
    });
    console.error(`Error creating movie: ${error}`);
  }
};

const getAllMovies = async (req, res) => {
  try {
    const username = req.body.username;
    const currentUserMovies = await Users.findOne({ username: username });
    res.status(200).json({
      movies: currentUserMovies,
    });
  } catch (error) {
    res.status(400).json({
      error: `Error getting movies: ${error.message}`,
    });
    console.error(`Error getting movies: ${error}`);
  }
};

const deleteMovies = async (req, res) => {
  try {
    const womp = await Movies.deleteMany({});
    res.status(200).json({ msg: `Deleted ${womp.deletedCount} movies` });
  } catch (error) {
    console.log(`Error deleteing users ${error}`);
  } finally {
    res.end();
  }
};

export { createMovie, getAllMovies, deleteMovies };
export default originalId