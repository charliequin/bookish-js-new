const EXPRESS = require('express');
const HTTP = require('http');
const PATH = require('path');
const APP = EXPRESS();
const indexController = require('./controllers/index-controller.js');
const aboutUsController = require('./controllers/about-us-controller.js');
const booksController = require('./controllers/books-controller.js');
const authorController = require('./controllers/authors-controller.js');


let server = HTTP.createServer(APP);
let port = process.env.PORT | 8080;
APP.listen(port);

APP.set('views', __dirname + '/views');
APP.engine('html', require('ejs').__express);
APP.set('view engine', 'html');

APP.use(EXPRESS.static(PATH.join(__dirname, '/static')));
APP.use(EXPRESS.urlencoded());

indexController.register(APP);
aboutUsController.register(APP);
booksController.register(APP);
authorController.register(APP);

console.log(`Server initialised on https://localhost:${port}`);
