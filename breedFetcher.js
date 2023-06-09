const request = require('request');

const breedName = process.argv[2];

// Check if the breed name is provided
if (!breedName) {
  console.error('Please provide a breed name as a command-line argument.');
  process.exit(1);
}

const fetchBreedDescription = function(breedName, callback) {
  const url = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(`Request error: ${error.message}`);
      return;
    }

    const data = JSON.parse(body);

    if (data.length === 0) {
      callback(`Breed '${breedName}' not found.`);
    } else {
      const breedInfo = {
        name: data[0].name,
        description: data[0].description
      };
      callback(null, breedInfo.description);
    }
  });
};

module.exports = { fetchBreedDescription }