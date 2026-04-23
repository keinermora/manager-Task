<<<<<<< HEAD
const Task = require("../models/task.model");
const mongoose = require("mongoose");
const asyncHandler = require("../utils/asyncHandler");

exports.getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
});

exports.getTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID Invalido" });
  }
  const task = await Task.findById(id);
  if (!task) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  res.status(200).json(task);
});

exports.createTask = asyncHandler(async (req, res) => {
  const { name, completed } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Nombre es requerido" });
  }
  const task = new Task({ name, completed });
  await task.save();
  res.status(201).json(task);
});

exports.updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, completed } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID Invalido" });
  }
  if (!name) {
    return res.status(400).json({ error: "Nombre es requerido" });
  }
  const task = await Task.findByIdAndUpdate(
    id,
    { name, completed },
    { new: true },
  );
  if (!task) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  res.status(200).json(task);
});

exports.deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID Invalido" });
  }

  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  res.status(200).json({ message: "Tarea eliminada exitosamente" });
});
=======
const Task = require('../models/task.model');

exports.getTasks = async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);

}

exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
};


exports.createTask = async (req, res) => {
    const { name, completed } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    const task = new Task({ name, completed }); 
    await task.save();
    res.json(task);
}

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { name, completed } = req.body;
    const task = await Task.findByIdAndUpdate(id, { name, completed }, { new: true });
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
}

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Tarea eliminada exitosamente' });
}
>>>>>>> 108cb24c41a08aba50b81ebc87e92a1b7dbeb034
