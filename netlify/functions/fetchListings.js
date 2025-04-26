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

    $('li.cl-static-search-result').each((i, elem) => {
      const anchor = $(elem).find('a');
      const title = anchor.find('.title').text().trim();
      const price = anchor.find('.price').text().trim();
      const url = anchor.attr('href');

      const dataIds = $(elem).attr('data-ids');
      let image = null;

      if (dataIds) {
        const firstId = dataIds.split(',')[0];
        if (firstId) {
          const cleanId = firstId.split(':')[1]; // Remove the "1:" prefix
          image = `https://images.craigslist.org/${cleanId}_300x300.jpg`;
        }
      }

      listings.push({
        title,
        price,
        url,
        image, // 👈 Include image URL!
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
