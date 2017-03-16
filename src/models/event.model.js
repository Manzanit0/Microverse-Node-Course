'use strict';

/**
 * Event model por testing API
 */
// const events = [
//     {id: 12345, title: 'Un evento', descripcion: 'asñkdlfhasdkfjh', fecha: '12/01/1998'},
//     {id: 98663, title: 'Otro evento', descripcion: 'qwerty', fecha: '01/02/2001'}
// ];

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title:  String,
  description: String,
  date: { type: String },
});

/**
 * Export event model
 */
module.exports = eventSchema;
