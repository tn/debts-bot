const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const DebtSchema = new Schema({
  title: String,
  created_at: { type: Date, default: Date.now },
  closed: Boolean,
  author: String,
  dest: String,
  sum: Number
});

module.exports = mongoose.model('Debt', DebtSchema);
