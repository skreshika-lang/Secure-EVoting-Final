const mongoose = require('mongoose');
const voteSchema = new mongoose.Schema({
  voterId: String,
  candidate: String,
  hash: String,
  previousHash: String,
  timestamp: {type:Date, default:Date.now}
});
module.exports = mongoose.model('Vote', voteSchema);
