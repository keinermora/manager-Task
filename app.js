const express = require('express');
const app = express();

const mongoose = require('mongoose'); 

app.use(express.json());

const taskRoutes = require("./routes/task.routes");
app.use(taskRoutes);

mongoose.connect('mongodb://localhost:27017/managertasksdb')
.then(()=>console.log("la base de datos se conecto de manera correcta"))
.catch(err => console.error("Error al conectar a la base de datos", err));
app.listen(3000, () => {
   console.log("Servidor corriendo en puerto 3000");
});