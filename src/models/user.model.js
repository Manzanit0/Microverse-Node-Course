'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * There are no endpoints to create new Users yet, so I manually added one:
 *
 * {
 *    username: "arielcamus",
 *    password: "123456",
 *    email: "arielcamus@microverse.org"
 * }
 *
 */

const userSchema = new Schema({
  username:  { type: String, index: true },
  password: String,
  email: { type: String, index: true },
});

/**
 * Export user model
 */
module.exports = userSchema;
