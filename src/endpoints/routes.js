'use strict';

/**
 * Load express library
 */
const express = require('express');

/**
 * Load enpoints files
 */
const event = require('./event.endpoint.js');
const user = require('./user.endpoint.js');

/**
 * API Endpoints defined for REST
 */
const routes = (app) => {
    app.use('/events', event);
    app.use('/users', user);
};

module.exports = routes;
