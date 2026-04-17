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