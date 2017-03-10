'use strict';

/**
 * Import express library
 */
const express = require('express'),
     bodyParser = require('body-parser'); //Parse JSON in body request

/**
 * Load files
 */
const config = require('./config/server.config');

/**
 * Create express app
 */
const app = express();

/**
 * Apply libraries over our app
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Require route file wit app
 */
require('./endpoints/routes.js')(app);

/**
 *  Start server
 */
app.listen(config.port, () => console.log('Example app listening on port ' + config.port + '!'));
