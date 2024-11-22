// fetchRedirects.js
const fs = require('fs');
const axios = require('axios');

async function fetchRedirects() {
  let redirects = [];
  let totalRedirects = 0;
  const pageSize = 10;
  let currentPage = 1;

  try {
    do {
      const response = await axios.get(`https://apis.carprices.ae/api/redirects?pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`);
      redirects = redirects.concat(response.data.redirects);
      totalRedirects = response.data.total;
      currentPage += 1;
    } while (redirects.length < totalRedirects);

    // Save redirects to a JSON file
    fs.writeFileSync('./redirects.json', JSON.stringify(redirects, null, 2));
    console.log('Redirects fetched and saved to redirects.json');
  } catch (error) {
    console.error('Error fetching redirects:', error);
  }
}

fetchRedirects();
