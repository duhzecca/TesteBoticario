const EXPRESS = require('express');
const ROUTER = require('../routes/router');
let expressValidator = require('express-validator');
let bodyParser = require('body-parser');

let app = EXPRESS();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use('/', ROUTER);

module.exports = app;