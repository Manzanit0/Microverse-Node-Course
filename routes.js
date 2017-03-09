'use strict';

const express = require('express');

const event = require('./event.endpoint');


/**
 * API Endpoints defined for REST
 */
const routes = (app) => {
    app.use('/event', event);
};

module.exports = routes;
