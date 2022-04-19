


/*const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const autorSchema = new Schema(
  {

     name: { type: String, require: true },
     gender: {type: String, require: true},
     typeText:{type: String, require: true},
     age:{type: Number, require: false},
    Image:{type: String,require: true}
  },
  { timestamps: true }
);
const Autor = mongoose.model("autores", autorSchema);
module.exports = Autor;*/

//Importamos express
const express = require("express");
//Guardamos la funcion express.Router() en una variable
const router = express.Router();

//Importamos las funciones del controlador de color
const { getAllAutores, getAutorById, newAutor, updateAutorById, deleteAutorById} = require("../controllers/autores.controller");
//Definimos el metodo, la ruta de entrada y la función del controlador
//que se encargará de efectuar la lógica

router.get("/", getAllAutores);

router.put("/:autorId", updateAutorById);
router.get("/:autorId", getAutorById);
router.post("/newAutor", newAutor);
router.delete("/:autorId", deleteAutorById)
//exportamos la variable router

module.exports = router;