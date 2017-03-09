'use strict';

/**
 * Import express library
 */
const express = require('express');

//const routes = require('./routes');

/**
 * Create express app
 */
const app = express();

require('./routes.js')(app);

/**
 *  Start server
 */
app.listen(3000, () => console.log('Example app listening on port 3000!'));
