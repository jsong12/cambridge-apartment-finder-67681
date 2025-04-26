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

    console.log(html); // 👈 Add this line to log the full Craigslist HTML

    const $ = cheerio.load(html);

    const listings = [];

    // We were originally trying 'li.cl-search-result' but we'll verify based on the real HTML printed
    $('li.cl-search-result').each((i, elem) => {
      const anchor = $(elem).find('a.cl-app-anchor');
      const title = anchor.find('.title').text();
      const price = anchor.find('.price').text();
      const url = anchor.attr('href');

      listings.push({
        title,
        price,
        url,
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
