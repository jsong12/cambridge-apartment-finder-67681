const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const cheerio = require('cheerio');

exports.handler = async function () {
  try {
    const url = 'https://boston.craigslist.org/search/apa?query=Cambridge&bedrooms=1&availabilityMode=0&max_price=2800';
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const html = await res.text();
    const $ = cheerio.load(html);

    const listings = [];

    $('.result-info').each((i, elem) => {
      const title = $(elem).find('.result-title').text();
      const url = $(elem).find('.result-title').attr('href');
      const price = $(elem).find('.result-price').first().text();
      const location = $(elem).find('.result-hood').text().trim();

      listings.push({
        title,
        price,
        url,
        location,
      });
    });

    return {
      statusCode: 200,
      body: JSON.stringify(listings),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch listings' }),
    };
  }
};
