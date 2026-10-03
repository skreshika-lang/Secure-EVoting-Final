const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  voterId: {type:String, unique:true},
  aadhaar: {type:String, unique:true},
  phone: String,
  status: {type:String, default:'pending'},
  hasVoted: {type:Boolean, default:false},
  faceDescriptor: {type:Array, default:[]}, // NEW: Stores 128 numbers of your face
  createdAt: {type:Date, default:Date.now}
});
module.exports = mongoose.model('User', userSchema);