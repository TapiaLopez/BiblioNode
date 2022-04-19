const Autor = require("../models/autores");

const HTTPSTATUSCODE = require("../../utils/httpStatusCode");
//const autor = require("../models/autores");


const getAllAutores = async (req, res, next) => {
  console.log("GET ALL AUTORES")

  try {
   
    if (req.query.page) { 
      console.log(req.query.page)
      const page = parseInt(req.query.page);
      const skip = (page - 1) * 20;
      

      const autores = await Autor.find().skip(skip).limit(20);
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { autores: autores },
      });
    } else {
     

      const autores = await Autor.find().populate("libros");
      

      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { autores: autores },
      });
    }
  } catch (err) {

    return next(err);
  }
};

const getAutorById = async (req, res, next) => {
  console.log("GET AUTOR BY ID")

  try {
   
    const { autorId } = req.params;
    const autorById = await Autor.findById(autorId);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: { autores: autorById }
    });
  } catch (err) {
    return next(err);
  }
};

const newAutor = async (req, res, next) => {
  console.log("NEW LIBRO")


  /*
     name: { type: String, require: true },
     gender: {type: String, require: true},
     typeText:{type: String, required: true},
     age:{type: Number, required: false},
    Image:{ type:String,require: true},
  */
  try {
    const newAutor = new Autor();
    newAutor.name = req.body.name;
    newAutor.gender = req.body.gender;
    newAutor.typeText = req.body.typeText;
    newAutor.age = req.body.age;
    newAutor.descripcion = req.body.descripcion; 
    newAutor.Image = req.body.Image; 
    //if (req.authority) newAutor.libros = req.authority.id; 

    const autorDb = await newAutor.save()
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: { autor: autorDb }
    });
  } catch (err) {
    return next(err);
  }
}
const updateAutorById = async (req, res, next) => {
  console.log("UPDATE AUTOR BY ID")

  try {
    const { autorId } = req.params;
    console.log("UPDATE AUTOR BY ID1")

    //const authority = req.authority.id
    console.log("UPDATE AUTOR BY ID2")

    const userAutor = await Autor.findById(autorId)

    //if (authority == userAutor.author._id) {

      const autorToUpdate = new Autor();

      if (req.body.name) autorToUpdate.name = req.body.name;
      if (req.body.gender) autorToUpdate.gender = req.body.gender;
      if (req.body.typeText) autorToUpdate.typeText = req.body.typeText;
      if (req.body.age) autorToUpdate.age = req.body.age;
      if (req.body.Image) autorToUpdate.Image = req.body.Image;
      if (req.body.descripcion) autorToUpdate.descripcion = req.body.descripcion;
      if (req.body.libros) autorToUpdate.libros = req.body.libros;
      autorToUpdate._id = autorId;

      const autorUpdated = await Autor.findByIdAndUpdate(autorId, autorToUpdate);
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { autor: autorUpdated }
      });
    /*} else {
      return res.json({
        status: 403,
        message: HTTPSTATUSCODE[403],
        data: null
      })
    }*/

  } catch (err) {
    return next(err);
  }
}

const deleteAutorById = async (req, res, next) => {
  console.log("DELETE LIBRO BY ID")

  try {
    const { autorId } = req.params;
    //const authority = req.authority.id

    //const autores = await Autor.findById(autorId)

    //if (authority == autores.author._id) {

      const autorDeleted = await Autor.findByIdAndDelete(autorId);
      if (!autorDeleted) {
        return res.json({
          status: 200,
          message: "There is not a autor with that Id",
          data: null
        })
      } else {
        return res.json({
          status: 200,
          message: HTTPSTATUSCODE[200],
          data: { autor: autorDeleted },
        });
      }
    /*} else {
      return res.json({
        status: 403,
        message: HTTPSTATUSCODE[403],
        data: null
      })
    }*/
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getAllAutores,
  getAutorById,
  newAutor,
  updateAutorById,
  deleteAutorById,
}
