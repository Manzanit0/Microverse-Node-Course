/**
 * Import express library
 */
const express = require('express');

/**
 * Create express app
 */
const app = express();

/**
 * Create GET handler
 */
app.get('/test', (req, res, next) => res.send('GET request on /test'));

/**
 * Crete POST handler
 */
app.post('/ping', (req, res) => res.send('Post request on /ping'));

/**
 *  Start server
 */
app.listen(3000, () => console.log('Example app listening on port 3000!'));