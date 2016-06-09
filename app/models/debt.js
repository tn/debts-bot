const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DebtSchema = new Schema({
  group: { type: Number, max: 1000000 },
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

  update (data, sum, callback) {
    let debt = this.getInstance();

    debt.findOneAndUpdate(data, { sum: sum }, callback);
  }

  findByAuthorAndDest (author, dest, callback) {
    let debts = this.getInstance();

    debts.findOne({
      author: new RegExp(author),
      dest: new RegExp(dest)
    }, 'sum', callback);
  }

  findByName (name, type, callback) {
    let debts = this.getInstance();

    if (type === 'author') {
      debts.find({
        author: new RegExp(name)
      }).exec(callback);
    } else {
      debts.find({
        dest: new RegExp(name)
      }).exec(callback);
    }
  }
};
