const Msgr = require('./bootstrap').bot;
const Connection = require('./bootstrap').db();
const Ctrl = require('./controllers/debt');

module.exports = class Router {
  constructor () {
    Connection.on('error', function () {
      Msgr.on('text', function (msg) {
        Msgr.sendMessage(msg.chatId, 'Error.');
      });
    });

    Connection.once('open', function () {
      let ctrl = new Ctrl();

      Msgr.onText(/\/debt (@[a-z0-9]+) ([-0-9]+)/gi, ctrl.save.bind(this));
      Msgr.onText(/\/mydebts/gi, ctrl.index.bind(this));
      Msgr.onText(/\/debtsforme/gi, ctrl.reverseIndex.bind(this));
      Msgr.onText(/\/start/gi, ctrl.start.bind(this));
    });
  }
}
