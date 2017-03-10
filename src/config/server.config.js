'use strict';

/**
 * Main server configuration
 */
const config = {
    port: process.env.ENV === 'dev' ? 4000 : 3000,
    url: 'localhost',
    env: process.env.ENV === 'dev' ? 'dev' : 'pro'
};

module.exports = config;
