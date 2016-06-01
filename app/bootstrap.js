const TelegramBot = require('node-telegram-bot-api');
const Routes = require('../config/routes');
const Token = '233213871:AAF4FeHwMd_abJLcKOC4LSjEB14YxO3dKJY';

module.exports = new TelegramBot(Token, { polling: true });
