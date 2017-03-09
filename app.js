
const event = {id:0, title:'', descripcion:'', fecha:'24/02/1993'};

const eventArray = [];

eventArray.push({id:12345, title:'Un evento', descripcion:'asñkdlfhasdkfjh', fecha:'12/01/1998'});
eventArray.push({id:98663, title:'Otro evento', descripcion:'qwerty', fecha:'01/02/2001'});

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
 app.get('/event', function (req, res) {
   res.json(eventArray);
 });

/**
 *  Start server
 */
app.listen(3000, () => console.log('Example app listening on port 3000!'));
