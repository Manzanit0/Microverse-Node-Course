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
 * Create POST handler
 */
app.post('/ping', (req, res) => res.send('Post request on /ping'));

app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  });

/**
 *  Start server
 */
app.listen(3000, () => console.log('Example app listening on port 3000!'));
