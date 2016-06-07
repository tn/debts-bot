const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DebtSchema = new Schema({
  group: { type: Number, max: 1000000 },
  created_at: { type: Date, default: Date.now },
  author: String,
  dest: String,
  sum: Number,
  currency: { type: String, default: 'руб.' }
});

module.exports = class DebtModel {
  constructor () {}

  getInstance () {
    return mongoose.model('Debt', DebtSchema);
  }

  save (data) {
    let debt = this.getInstance();
    debt = new debt(data);
    return debt.save();
  }

  findByName (name, type, callback) {
    let debts = this.getInstance();

    if (type === 'author') {
      debts.find({
        author: new RegExp(name)
      }).limit(30).exec(callback);
    } else {
      debts.find({
        dest: new RegExp(name)
      }).limit(30).exec(callback);
    }
  }
};
