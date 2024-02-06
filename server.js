//import express framework
const express = require('express'); 
//import axios for http requests
const axios = require('axios'); 
//create express app
const app = express(); 
//define port number
const port = 3000; 

//middleware to serve static files from the public directory
app.use(express.static('public'));
//route to fetch a joke from jokeapi
app.get('/joke', async (req, res) => {
    //setting default category if none is provided
    const category = req.query.category || 'Programming'; 
    try {
        //fetching a random joke from the specified category
        const response = await axios.get(`https://v2.jokeapi.dev/joke/${category}`);
        //sending the joke data back to the client
        res.json(response.data);
    } catch (error) {
        //error handling for the api request
        res.status(500).json({ error: 'An error occurred while fetching the joke' });
    }
});

//starting the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
