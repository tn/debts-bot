const Msgr = require('../bootstrap').bot;
const Renderer = require('../renderer');
const DebtModel = require('../models/debt');
const moment = require('moment');

module.exports = class DebtsController {
  /**
  * Constructor
  * param @userId String
  */
  constructor () {

  };

  /**
  * Index
  * Get all debts by user name
  * return Array
  */
  index (msg) {
    let userName = `@${msg.from.username}`;
    this.model = new DebtModel();
    let render = new Renderer();

    let filtered = this.model.findByName(userName, 'author', function (err, doc) {
      if (err) {
        Msgr.sendMessage(msg.chat.id, 'Произошла ошибка.');
      } else {
        Msgr.sendMessage(msg.chat.id, render.myDebts(doc));
      }
    });
  }

  reverseIndex (msg) {
    let userName = `@${msg.from.username}`;
    this.model = new DebtModel();
    let render = new Renderer();

    let filtered = this.model.findByName(userName, 'dest', function (err, doc) {
      if (err) {
        Msgr.sendMessage(msg.chat.id, 'Произошла ошибка.');
      } else {
        Msgr.sendMessage(msg.chat.id, render.debtsForMe(doc));
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
      sum: match[2],
      created_at: moment().format('DD-MM-YYYY')
    };

    this.model = new DebtModel();
    let render = new Renderer();

    let saved = this.model.save(debt);

    saved.then(function (doc) {
      if (typeof doc === 'object') {
        Msgr.sendMessage(msg.chat.id, render.save(debt));
      } else {
        Msgr.sendMessage(msg.chat.id, 'Произошла ошибка. Проверьте параметры.');
      }
    });
  }
}
