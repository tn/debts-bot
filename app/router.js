const Msgr = require('./bootstrap');

module.exports = class Router {
  constructor () {
    Msgr.on('text', this.dispatcher.bind(this));
  }

  dispatcher (message) {
    let chatId = message.chat.id;
    Msgr.sendMessage(chatId, 'test');
  }
}
