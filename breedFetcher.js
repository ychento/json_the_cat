const request = require('request');

const breedName = process.argv[2];

// Check if the breed name is provided
if (!breedName) {
  console.error('Please provide a breed name as a command-line argument.');
  process.exit(1);
}


const url = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;


request(url, (error, response, body) => {
  if (error) {
    console.error('Request error:', error.message);
    return;
  }

  const data = JSON.parse(body);

  console.log('Data:', data);
  console.log('Type of data:', typeof data);

  if (data.length === 0) {
    console.log(`Breed '${breedName}' not found.`);
  } else {
    console.log('Breed Information:');
    console.log('Name:', data[0].name);
    console.log('Description:', data[0].description);
  }
});