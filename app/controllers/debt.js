const Msgr = require('../bootstrap').bot;
const DebtModel = require('../models/debt');

module.exports = class DebtsController {
  constructor () {};

  start (msg) {
    let message = 'Let\'s get start!\n/debt @username sum - Create new debt\n/mydebts - Your debts\n/debtsforme - Debts to you';

    Msgr.sendMessage(msg.chat.id, message);
  };

  index (msg) {
    let userName = `@${msg.from.username}`;
    this.model = new DebtModel();
    let message = 'Your debts\n==========\n';

    let filtered = this.model.findByName(userName, 'author', function (err, doc) {
      if (err) {
        Msgr.sendMessage(msg.chat.id, 'Something is wrong. Please try later.');
      } else {
        for (let item of doc) {
          message += `Your debt to ${item.dest} equals ${item.sum}\n`;
        }
        Msgr.sendMessage(msg.chat.id, message);
      }
    });
  }

  reverseIndex (msg) {
    let userName = `@${msg.from.username}`;
    this.model = new DebtModel();
    let message = 'Debts to you\n==========\n';

    let filtered = this.model.findByName(userName, 'dest', function (err, doc) {
      if (err) {
        Msgr.sendMessage(msg.chat.id, 'Something is wrong. Please try later.');
      } else {
        for (let item of doc) {
          message += `Debt from ${item.author} equals ${item.sum}\n`;
        }
        Msgr.sendMessage(msg.chat.id, message);
      }
    });
  }

  /**
  * Show
  * Get debt by id
  * param @id Number
  * return Object
  */
  show (id) {}

  /**
  * Save
  * Save debt from current user
  * param @debt Object
  */
  save (msg, match) {
    let debt = {
      group: msg.chat.id,
      author: `@${msg.from.username}`,
      dest: match[1],
      sum: match[2]
    };

    let model = new DebtModel();

    let sum = model.findByAuthorAndDest(debt.author, debt.dest, function (err, doc) {
      if (doc !== null && err === null) {
        let newSum = parseInt(doc.sum) + parseInt(debt.sum);

        if (newSum < 0) {
          Msgr.sendMessage(msg.chat.id, `Debt can't be negative. Your debt to ${debt.dest} equals ${doc.sum}`);
          return false;
        } else {
          model.update({ author: debt.author, dest: debt.dest }, newSum, function (err, doc) {
            if (!err) {
              Msgr.sendMessage(msg.chat.id, `Your debt to ${debt.dest} equals ${newSum}`);
            } else {
              Msgr.sendMessage(msg.chat.id, 'Something is wrong. Please try later.');
            }
          });
        }
      } else {
        let saved = model.save(debt);

        saved.then(function (err, doc) {
          if (doc !== null) {
            Msgr.sendMessage(msg.chat.id, `Your debt to ${debt.dest} equals ${debt.sum}`);
          } else {
            Msgr.sendMessage(msg.chat.id, 'Something is wrong. Please try later.');
          }
        });
      }
    });
  }
}
