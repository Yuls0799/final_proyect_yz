const express = require('express');
const app = express();
const generateId = require('uuid').v4;
const db = require('./db');

app.use(express.static("./"));

app.post("/crear/:tarea", (req, res) => {
    const tarea = req.params.tarea;
    db.run("insert into Tareas (id, titulo) values (@id, @titulo)", { id: generateId(), titulo: tarea });
     
    res.send(`La tarea se ha guardado!`);
})

app.get("/verTareas", async (req, res) => {
    const tareas = db.query("SELECT * FROM Tareas", []);

    res.send(tareas);
})


/*edit*/ 
app.put("/editar/:id/:nuevoValor", async (req,res) =>{
    const id = req.params.id;
    const nuevoValor = req.params.nuevoValor;
    /*Actualizar*/
    db.run('UPDATE Tareas SET titulo = ? WHERE id = ?', [nuevoValor, id]);
     
    res.send(`La tarea se ha guardado!`);

})

/* delete */
app.delete("/eliminar/:id", async (req,res) =>{
    const id = req.params.id;
   /*eliminar*/
    db.run('DELETE FROM Tareas WHERE id = ?', id);
 
    res.send("DELETE Request Called");

})


app.listen(5000, () => console.log("Server corriendo"));