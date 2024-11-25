import express from "express";
import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/connect.js";
import router from "./routes/user.js";
import global_router from "./routes/global.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import movie_router from "./routes/movie.js";
import likes_router from "./routes/likes.js";
import cors from 'cors'

dotenv.config();
const app = express();

//get the directortry name of curent file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const corsOptions = {
  origin: '*', // Allow only this origin
  methods: ['GET', 'POST'], // Allow only these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};
app.use(cors(corsOptions))
app.use(express.static(path.join(__dirname,'public')))


app.set("view engine", "ejs");
const PORT = 3000;
console.clear();
connectDB();

//<=middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(basicAuth)
app.use(cookieParser());
app.use(bodyParser.json());


const getUserById = async (id) => {
  try {
    const user = await tes.findById(id);
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};

//all methods to use uodate operation
const updateUser = async (id, updatedData) => {
  try {
    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};

app.use("/users", router);
app.use("/movies", global_router);
app.use("/user", movie_router);
app.use("/user/movies/likes", likes_router);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server Started at : ${PORT}`);
});

