import express from "express";
import mongoose from "mongoose";
import tes from "../models/moviesModel.js";

const createUser = async () => {
  try {
    const user = new tes({
      name: "vher",
      ratings: 4,
      price: 5,
      genre: ["Boom", "Adventure"],
    });
    const res = await user.save();
    console.log(`User created successfully : ${res}`);
  } catch (err) {
    console.log(`Error saving user ${err}`);
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await tes.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: `Deleted ${deletedUser.deletedCount} documents` });
  } catch (err) {
    res.status(500).json({ message: `Error deleting user ${err}` });
  }
};

const getAllUsers = async () => {
  try {
    const users = await tes.find();
    console.log(`All users : ${users}`);
  } catch (error) {
    console.log(`Error getting all users: ${error}`);
  }
};

export { getAllUsers, deleteUser, createUser };
