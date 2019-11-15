const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate')

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
  date:{
    type: Date,
    default: Date.now
  },
  books:[{
    type: Schema.Types.ObjectId,
    ref: "Books"
  }]
})

UserSchema.plugin(findOrCreate);

const User = mongoose.model('User', UserSchema);

module.exports = User;