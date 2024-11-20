import express from "express";
import mongoose from "mongoose";
import Movies from "../models/moviesModel.js";
import Users from "../models/usersModel.js";
import Likes from "../models/likesmodel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();   
    
const _like_aMovie = async (req, res) => {
  try {
    const token = req.cookies.authcookie;
    console.log(token)
    const decoded = jwt.verify(token, process.env.jwtPass);
    console.log(decoded.user._id);
    const user = await Users.findById(decoded.user._id);
    const movie = await Movies.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.likes.includes(movie._id)) {
      return res.status(400).json({ message: "User already likes this movie" });
    }

    const likeMovie = new Likes({userId:user,movieId:movie})

    await Users.findByIdAndUpdate(user._id, { $push: { likes: movie._id } });
    await Movies.findByIdAndUpdate(movie._id, { $inc: { likes: 1 } });
    await likeMovie.save()
    res.status(201).json({
      message: "Movie liked successfully",
      user: await Users.findById(decoded.id),
      movie: await Movies.findById(req.params.id)
    });
  } catch (error) {
    res.status(500).json({ message: "Error liking movie", error });
  }
};

const getLikedMovies = async (req,res) => {
  try{
  const find = await Likes.find()
  if(!find) return res.status(404).json({message: "No liked movies found"})
  res.status(200).json({'liked movies by you': find})
  }
  catch (error) {
    res.status(500).json({ message: "Error getting liked movies", error });
  }

}

const unlikeMovie = async (req,res) =>{
  try {
    const token = req.cookies.authcookie;
    // console.log(token)
    const decoded = jwt.verify(token, process.env.jwtPass);
    // console.log(decoded.user._id);
    const user = await Users.findById(decoded.user._id);
    const movie = await  Movies.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    // if (!user.likes.includes(movie._id)) {
    //   return res.status(400).json({ message: "Movie is not liked by user" });
    // }
    const delet = await Likes.findByIdAndDelete(movie._id)
    await Users.findByIdAndUpdate(user._id, { $pull: { likes: movie._id } });
    await Movies.findByIdAndUpdate(movie._id, { $inc: { likes: -1 } });
    res.status(200).json({
      message: "Movie unliked successfully",
      user: await Users.findById(decoded.id),
      movie: await Movies.findById(req.params.id)
      });
    
  } catch (error) {
    res.status(400).json({msg:error.message})
    console.log(error)
  }
}



export { _like_aMovie , getLikedMovies , unlikeMovie }  ;  