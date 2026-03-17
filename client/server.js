'use strict';

// express is a nodejs web server
// https://www.npmjs.com/package/express
const express = require('express');

// converts content in the request into parameter req.body
// https://www.npmjs.com/package/body-parser
const bodyParser = require('body-parser');

// express-handlebars is a templating library
// https://www.npmjs.com/package/express-handlebars
// - look inside the views folder for the templates
// data is inserted into a template inside {{ }}
const { engine } = require('express-handlebars');

// axios is used to make REST calls to the backend microservice
// details here: https://www.npmjs.com/package/axios
const axios = require('axios');

// create the server
const app = express();

// set up handlebars as the templating engine
app.set('view engine', 'hbs');
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'default'
}));

// set up the parser to get the contents of data from html forms
// this would be used in a POST to the server as follows:
// app.post('/route', urlencodedParser, (req, res) => {}
const urlencodedParser = bodyParser.urlencoded({ extended: false });


// defines a route that receives the request to /
app.get('/', (req, res) => {
    // make a request to the backend microservice using the axios package
    // the URL for the backend service should be set in configuration
    // using an environment variable. Here, the variable is passed
    // to npm start inside package.json:
    //  "start": "SERVER=http://localhost:8082 node server.js",
    axios.get(process.env.SERVER + '/events')
        .then(response => {
            console.log('statusCode:', response.status);
            console.log(response.data);
            res.render('home',
                {
                    layout: 'default',  //the outer html page
                    template: 'index-template', // the partial view inserted into
                    // {{body}} in the layout - the code
                    // in here inserts values from the JSON
                    // received from the server
                    events: response.data.events
                }); // pass the data from the server to the template
        })
        .catch(error => {
            console.log('error:', error.message);
            res.status(500).json({ message: error.message });
        });

});


// defines a route that receives the post request to /event
app.post('/event',
    urlencodedParser, // second argument - how to parse the uploaded content
    // into req.body
    (req, res) => {
        // make a request to the backend microservice using the axios package
        // the URL for the backend service should be set in configuration
        // using an environment variable. Here, the variable is passed
        // to npm start inside package.json:
        //  "start": "SERVER=http://localhost:8082 node server.js",
        axios.post(
            process.env.SERVER + '/event',  // the microservice end point for adding an event
            req.body,  // content of the form
            {
                headers: { // uploading json
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(response => {
                console.log('statusCode:', response.status);
                console.log(response.data);
                res.render('home',
                    {
                        layout: 'default',  //the outer html page
                        template: 'index-template', // the partial view inserted into
                        // {{body}} in the layout - the code
                        // in here inserts values from the JSON
                        // received from the server
                        events: response.data.events
                    }); // pass the data from the server to the template
            })
            .catch(error => {
                console.log('error:', error.message);
                res.status(500).json({ message: error.message });
            });

    });


// create other get and post methods here - version, login,  etc




// generic error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});

// specify the port and start listening
const PORT = 8080;
const server = app.listen(PORT, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`Events app listening at http://${host}:${port}`);
});

module.exports = app;
