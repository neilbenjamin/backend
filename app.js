// Import required modules and load environment variables
//Import dotenv to allow us to work with environmental variables in the .env file
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const helmet = require('helmet');
//Assigning express functionality to app variable.
const app = express();

//use cors
app.use(cors());

//Assigning the apikey key to variable apiKey
const apiKey = process.env.API_KEY;
//Detting up content resource security to allow data being shared between the stipulated sources.
//Solution courtesy of Helmet.js, YouTube, and OpenAI.
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Allow resources to be loaded from the same origin (self)
      scriptSrc: ["'self'", "localhost:3000", "localhost:8080", "itunes.apple.com"], // Allow scripts to be loaded from your frontend, backend, and iTunes
    },
  })
);

///Base server router
app.get('/', function (req, res) {
  // Send the name property as a response using
  res.send(`Welcome, the server is active.`);
});

// Endpoint to fetch the API key
app.get('/api-key', (req, res) => {
  //respond to clinet with api
  res.json({ apiKey: apiKey });
});

// Asynchronous Router for dynamic search requirements from the user interface(Form) starting with
// .search and then adding in the user input thereafter for searchTerm and mediaType as defined by the
// iTunes API documentation. Solution courtesy of Hyperion PDF's, iTunes API documentation, and OpenAI for front-end/back-end linking.
app.get('/search', async (req, res) => {
  //Setting search paths terms to variables
  const searchTerm = req.query.term;
  const mediaType = req.query.media || 'all';
  // Validate the required search term conditional
  if (!searchTerm) {
    return res.status(400).send('Search term is required');
  }
  try {
    // Construct the iTunes API URL based on user input
    const apiUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&media=${mediaType}`;
    //itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&media=${mediaType}
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error fetching data from iTunes API: ${response.status} ${response.statusText}`);
    }
    //If successful, push the data to the data variable.
    const data = await response.json();
    //Respond with the data to the front-end server.
    res.json(data); // Send the fetched data back to the client
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from iTunes API');
  }
});

//Listening on port 8080.
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
