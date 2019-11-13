const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema =  new mongoose.Schema({
  name:{
    type: String,
    require: true,
    unique: true
  },
  email:{
    type: String,
  },
  password:{
    type: String,
  },
  idToken:{
    type:String
  },
  googleID:{
    type:String
  },
  fitbitID:{
    type:String
  },
  authOID:{
    type:String
  },
  date:{
    type: Date,
    default: Date.now
  },
  books:[{
    type: Schema.Types.ObjectId,
    ref: "Books"
  }]
})

const User = mongoose.model('User', UserSchema);

module.exports = User;