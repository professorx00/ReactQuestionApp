const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate')

const BooksSchema =  new mongoose.Schema({
  title:{
    type: String,
  },
  subtitle:{
    type: String,
  },
  publisher:{
    type: String,
  },
  publishedDate:{
    type: String,
  },
  previewLink:{
    type: String,
  },
  imageLinks:{
    type: Array,
  },
  authors:{
    type: Array
  },
  date:{
    type: Date,
    default: Date.now
  }
})

BooksSchema.plugin(findOrCreate);

const Books = mongoose.model('Books', BooksSchema);

module.exports = Books;