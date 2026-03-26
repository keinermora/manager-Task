const express = require('express');
const app = express();
const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', taskSchema);

app.use(express.json());

app.get("/tasks", async (req, res) => {
    const llamartasks = await Task.find();
    res.json(llamartasks);
});

app.post("/tasks",async (req, res)  => { 
const { name } = req.body;
if (!name) {
    return res.status(400).json({ message: "El nombre de la tarea es requerido" });
}
    const newTask = new Task({ name });
    await newTask.save()
    res.json(newTask);
 });


app.get("/tasks/:id", async (req, res) => {
    const id = req.params.id;
    const task = await Task.findById(id);
    if(!task){
        return res.status(404).json({message:"Tarea no encontrada"})
    }
    res.json(task);
});

app.listen(3000, () => {
   console.log("Servidor corriendo en puerto 3000");
});

app.delete("/tasks/:id", async (req, res) => {
    const id = req.params.id;
    const taskfind = await Task.findById(id);
    if (!taskfind) {
        return res.status(404).json({message: "Tarea no encontrada"})
    }
 await Task.findByIdAndDelete(id);
    
    res.json({message: "Tarea eliminada"});
});
  
app.put("/tasks/:id", async (req, res) => {
const id = req.params.id;
const updatedTask = req.body;
if (!updatedTask.name) {
    return res.status(400).json({ message: "El nombre de la tarea es requerido" });
}
const taskupdate = await Task.findByIdAndUpdate(id, updatedTask, { new: true });
if (!taskupdate) {
    return res.status(404).json({ message: "Tarea no encontrada" });
}



res.json(taskupdate);
});


            

mongoose.connect('mongodb://localhost:27017/managertasksdb')
.then(()=>console.log("la base de datos se conecto de manera correcta"))
.catch(err => console.error("Error al conectar a la base de datos", err));