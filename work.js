
import express from 'express';
import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/connect.js';
import router from './routes/user.js';
import global_router from './routes/global.js';
import cookieParser from 'cookie-parser'
import bodyParser from "body-parser";
import movie_router from './routes/movie.js';
import likes_router from './routes/likes.js';

dotenv.config();
const app = express();
const PORT = 3000;
console.clear()

connectDB();

//<=middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(basicAuth)
app.use(cookieParser())
app.use(bodyParser.json())


const getUserById = async (id) => {
  try {
    const user = await tes.findById(id)
    console.log(user)
  } catch (error) {
    console.log(error)
  }
}

        //all methods to use uodate operation
const updateUser  = async(id, updatedData) => {
    try {
        const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
        console.log(user);
    } catch (error) {
        console.log(error);
    }
}

app.use('/users',router)
app.use('/movies',global_router)
app.use('/user',movie_router)
app.use('/user',likes_router)

app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server Started at : ${PORT}`);
})



