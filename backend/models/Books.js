const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const Books = mongoose.model('Books', BooksSchema);

module.exports = Books;