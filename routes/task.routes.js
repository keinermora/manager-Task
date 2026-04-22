const taskController = require('../controllers/task.controller');
const express = require('express');
const router = express.Router();    

router.get('/tasks', taskController.getTasks);
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.get('/tasks/:id', taskController.getTaskById);

module.exports = router;