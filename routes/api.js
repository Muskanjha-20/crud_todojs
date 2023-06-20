const express = require("express");

const Todo_model = require("../models/todo_model");
const todo_model = require("../models/todo_model");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = Todo_model({
      title,
      description,
    });
    await todo.save();
    res
      .status(201)
      .json({ status_code: 201, message: "successfully posted", data: todo });
  } catch (error) {
    console.log(error);
    res.json({
      status_code: 500,
      message: "Server error",
      data: error,
    });
  }
});

router.get("/get", async (req, res) => {
  try {
    const findtodo = await Todo_model.find();
    res.json({
      status_code: 200,
      message: "get",
      data: findtodo,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status_code: 500,
      message: "error",
      data: error,
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Todo_model.findByIdAndDelete(id);
    res.json({
      status_code: 200,
      message: "successfully deleted",
      data: [],
    });
  } catch (error) {
    console.log(error);
    res.json({
      status_code: 500,
      message: "error",
      data: error,
    });
  }
});

router.patch("/update/:id", async(req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const updated_todo = await Todo_model.findByIdAndUpdate(id, {
      title,
      description,
      status,
    });
    res.json({ status_code: 200, message: "Updated", data: updated_todo });
  } catch (error) {
    console.log(error);
    res.json({
      status_code: 500,
      message: "error",
      data: error,
    });
  }
});

module.exports = router;
