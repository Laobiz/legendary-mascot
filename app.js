const cheerio = require('cheerio');
const got = require('got');

const vgmUrl= 'https://www.corsokino.de/programm';

const isMovieLink = (i, link) => {
  // Return false if there is no href attribute.
  if(typeof link.attribs.href === 'undefined') { return false }

  return link.attribs.href.includes('detail');
};

(async () => {
  const response = await got(vgmUrl);
  const $ = cheerio.load(response.body);
  console.log(response.body)

  $('h3').each((i, item) => {
    console.log($(item).text());
  });
})();
