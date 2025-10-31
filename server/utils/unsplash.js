const axios = require('axios');
const key = process.env.UNSPLASH_ACCESS_KEY;

async function searchUnsplash(term, per_page = 24) {
  const url = `https://api.unsplash.com/search/photos`;
  const res = await axios.get(url, {
    params: { query: term, per_page },
    headers: { Authorization: `Client-ID ${key}` }
  });
  return res.data;
}
module.exports = { searchUnsplash };
