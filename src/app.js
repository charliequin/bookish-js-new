const path = require('path');
const express = require('express');

const indexController = require('./controllers/index-controller');
const aboutUsController = require('./controllers/about-us-controller.js');


// SETUP EXPRESS
const app = express();
app.use(express.urlencoded());

// Use EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Serve static files from the 'static' folder
app.use(express.static('src/static'));

const port = 3000;



indexController.register(app);
aboutUsController.register(app);



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
