const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const autor = require('../models/autores');

const autores = [
  {
    name:"jane austen",
    gender: "Mujer", 
    typeText: "Romantico",
   Image:"http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQpAh6vAnn9vloo_M3P4vVRQC4v5npGXHtYGGHSwvrM1yDGsdpquzuWZsRRhLLO",
  },
  {
    name: "George R. R. Martin",
    gender: "Hombre",
    typeText:"ciencia ficción",
    age:73,
   Image:"http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQ5f9xivh2nba91pCrXLeFiz4eKkr3vWtPxMD0-bPGTWvy-VtaFjR8LC_RKLi5R",
}, 
{
  name: "Patrick Rothfuss",
  gender: "Hombre",
  typeText:"ciencia ficción",
  age:48,
 Image:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Patrick_Rothfuss.jpg/800px-Patrick_Rothfuss.jpg"
}, 
{
  name: "Diana Gabaldon",
    gender: "Mujer",
    typeText:"histórica,romántica",
    age:70,
   Image:"https://vader.news/__export/1624236961263/sites/gadgets/img/2021/06/20/diana-gabaldon.jpg_1420947879.jpg",
}
 ];

mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allAutores = await autor.find();
		
    if (allAutores.length) {
      await autor.collection.drop();
      console.log('Drop database')
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {

    await autor.insertMany(autores);
        console.log('DatabaseCreated')
	})
  .catch((err) => console.log(`Error creating data: ${err}`))

  .finally(() => mongoose.disconnect());