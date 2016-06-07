const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');

module.exports = {
  bot: new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true }),
  db: function () {
    mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URI}/${process.env.DB_NAME}`);
    return mongoose.connection;
  }
}
