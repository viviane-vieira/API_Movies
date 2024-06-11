const mongoose = require("mongoose")
 
const Movie = mongoose.model('Movie', {
   name: String,
   gender: String,
   year: Number,

  
   
})
module.exports = Movie