async function crawl() {
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch();
  
  const page = await browser.newPage();
  await page.goto('https://www.corsokino.de/programm');
  
  const dataPromise = await page.evaluate(() => {
      return Promise.resolve({
          filme: programm.filme
      });
  });
  
  browser.close();
  return dataPromise;
}

function getMovies() {
  var movies = [];
  crawl().then(function(result) {
    for (const [_, value1] of Object.entries(result.filme)) {
      movies.push(value1.filmfakten.titel);
    }
  });
  return movies;
}

const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.TELEGRAM_BOT_KEY)
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply(getMovies())) //TODO: Returns empty list
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))