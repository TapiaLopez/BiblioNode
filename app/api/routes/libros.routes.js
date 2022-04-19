const express = require("express");
const router = express.Router();

const { isAuth } = require("../../middlewares/auth.middleware");
const {
    newLibro,
    getAllLibros,
    getLibroById,
    deleteLibroById,
    updateLibroById,
    getAlllibrosByUser
} = require("../controllers/libros.controller");

router.post("/create", newLibro);

router.get("/", getAllLibros);

router.get("/librosbyuser",getAlllibrosByUser)

router.get("/:libroId", getLibroById);

router.delete("/:libroId", deleteLibroById,)

router.put("/:libroId", updateLibroById)

module.exports = router;