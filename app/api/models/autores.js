const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autorSchema = new Schema(
  {
    
     name: { type: String, required: true },
     gender: {type: String, required: true},
     typeText:{type: String, required: true},
     age:{type: Number, required: false},
    Image:{ type:String,required: true},
    descripcion:{ type:String,required: true},
    libros: [{ type: Schema.Types.ObjectId, ref: "libros", required: true }],

  },
  { timestamps: true }
);
const autor = mongoose.model("autor", autorSchema);
module.exports = autor;