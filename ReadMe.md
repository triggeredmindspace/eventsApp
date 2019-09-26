1. Getting started:

prerequisites: node and npm
    these are available inside GCP cloud shell if you can't install them locally.

a. open two separate terminals: one in /server, one in /client
b. run npm install in each terminal
c. run npm start in each terminal
d. navigate to http://localhost:8080

2. The sample app

Uses nodejs with the express web server on both server and client microservices.

The backend server receives REST requests on port 8082 and returns mock data.

The client inserts json from the server into an html template in the Views folder
and returns it to the requestor on port 8080.

3. Dependencies

client and server both use the following npm packages:

express: a web server
    https://www.npmjs.com/package/express
body-parser to convert json and form data in the request into parameters.
    https://www.npmjs.com/package/body-parser
mocha, chai and supertest (for unit testing)
    https://www.npmjs.com/package/mocha
    https://www.npmjs.com/package/chai
    https://www.npmjs.com/package/supertest


The client uses the following additional libaries:

express-handlebars ( a templating library)
    https://github.com/ericf/express-handlebars
nock (for mocking the api call)
    https://www.npmjs.com/package/nock

