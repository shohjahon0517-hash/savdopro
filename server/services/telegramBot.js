const { Telegraf } = require('telegraf');

const bot = process.env.TELEGRAM_BOT_TOKEN ? new Telegraf(process.env.TELEGRAM_BOT_TOKEN) : null;

const initializeTelegramBot = () => {
  if (!bot) {
    console.log('Telegram bot is disabled. Add TELEGRAM_BOT_TOKEN to enable it.');
    return;
  }

  bot.start((ctx) => {
    ctx.reply('Savdo Pro botiga xush kelibsiz!');
  });

  bot.command('status', (ctx) => {
    ctx.reply('Savdo Pro ishlayapti ✅');
  });

  bot.launch();
  console.log('Telegram bot started');
};

const sendTelegramSale = async (message) => {
  if (!bot) return;

  const chatId = process.env.TELEGRAM_ADMIN_ID;
  if (!chatId) return;

  try {
    await bot.telegram.sendMessage(chatId, message);
    console.log('Telegram sale sent');
  } catch (error) {
    console.error('Telegram error:', error.message);
  }
};

module.exports = { initializeTelegramBot, sendTelegramSale };
