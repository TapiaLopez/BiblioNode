const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LibroSchema = new Schema(
  {
    name: { type: String, require: true },
         typeText:{type: String, required: true},
     age:{type: Number, required: false},
     Image:{type: String, require: true},
     description:{type: String, require: true}
  },
  { timestamps: true }
);

const Libro = mongoose.model("libros", LibroSchema);
module.exports = Libro;