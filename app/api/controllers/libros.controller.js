const Libro = require("../models/libros");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");


const newLibro = async (req, res, next) => {
  try {
    const newLibro = new Libro();

    newLibro.name = req.body.name;
    newLibro.typeText = req.body.typeText;
    newLibro.age = req.body.age;
    newLibro.descripcion = req.body.description;
    newLibro.Image = req.body.Image; 

    const libroDb = await newLibro.save()
    const libroSaved = await Libro.findById(libroDb._id)
    
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: { libros: libroSaved }
    });
  } catch (err) {
    return next(err);
  }
}

const getAllLibros = async (req, res, next) => {
  console.log("GET ALL LIBROS")
  console.log("GET ALL LIBROS2")

  try {
    console.log("GET ALL LIBROS3")
    console.log(req.query.page)
    if (req.query.page) {
      
      console.log("GET ALL LIBROS4")

      console.log("GET ALL LIBROS5")

      const page = parseInt(req.query.page);
      console.log(page)
      const skip = (page - 1) * 20;
      console.log(skip)
      const libro = await Libro.find().skip(skip).limit(20);
      console.log("GET ALL LIBROS6")

      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { libros: libro },
      });
    } else {
      const libros = await Libro.find();

      //const libros = await Libro.find().populate("libros");
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { libros: libros },
      });
    }
  } catch (err) {
    return next(err);
  }
};

const getLibroById = async (req, res, next) => {
  console.log("GET LIBRO BY ID")

  try {
    const { libroId } = req.params;
    console.log("GET LIBRO BY ID 1")
    
    const libroDb = await Libro.findById(libroId);
    console.log("GET LIBRO BY ID 2")

    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: { libros: libroDb },
    });
  } catch (err) {
    return next(err);
  }
};

const deleteLibroById = async (req, res, next) => {
  console.log("DELETE LIBRO BY ID")

  try {
    const { libroId } = req.params;
    //const authority = req.authority.id
    const userLibro = await Libro.findById(libroId)

    //if (authority == userLibro.author._id) {

      const libroDeleted = await Libro.findByIdAndDelete(libroId);
      if (!libroDeleted) {
        return res.json({
          status: 200,
          message: "There is not a book with that Id",
          data: null
        })
      } else {
        return res.json({
          status: 200,
          message: HTTPSTATUSCODE[200],
          data: { libros: libroDeleted },
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
};

const updateLibroById = async (req, res, next) => {
  console.log("UPDATE LIBRO BY ID")

  try {
    const { libroId } = req.params;
    //const authority = req.authority.id
    const userLibro = await Libro.findById(libroId)

    //if (authority == userLibro.author._id) {

      const libroToUpdate = new Libro();
      if (req.body.name) libroToUpdate.name = req.body.name;
      if (req.body.description) libroToUpdate.description = req.body.description;
      if (req.body.autores) libroToUpdate.autores = req.body.autores;
      if (req.body.Image) libroToUpdate.Image = req.body.Image;
      if (req.body.description) libroToUpdate.description = req.body.description;

      libroToUpdate._id = libroId;
      const libroUpdated = await Libro.findByIdAndUpdate(libroId, libroToUpdate);
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { libros: libroUpdated }
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

const getAlllibrosByUser = async (req, res, next) => {
  console.log("GET ALL LIBRO BY USER")

  try {
    const author = req.authority.id;

    if (req.query.page) {
      const page = parseInt(req.query.page);
      const skip = (page - 1) * 20;
      const alllibrosByUser = await libros.find({ author: author }).skip(skip).limit(20).populate("autores");
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { libros: alllibrosByUser },
      });
    } else {
      const alllibrosByUser = await libros.find({ author: author }).populate("autores");
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { libros: alllibrosByUser },
      });
    }
  } catch (err) {
    return next(err)
  }
}
module.exports = {
  newLibro,
  getAllLibros,
  getLibroById,
  deleteLibroById,
  updateLibroById,
  getAlllibrosByUser
}