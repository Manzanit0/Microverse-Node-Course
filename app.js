'use strict';

/**
 * Import express library
 */
const express = require('express');
const bodyParser = require('body-parser'); // Librería requerida para parsear jsons.

//const routes = require('./routes');

/**
 * Create express app
 */
const app = express();
// Ahora aplicamos la librería...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes.js')(app);

/**
 *  Start server
 */
app.listen(3000, () => console.log('Example app listening on port 3000!'));
