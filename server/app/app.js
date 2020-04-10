'use strict';

// defining all the entry point for the app
module.exports = (app) => {
    const transactModel = require('./models/transactSchema');
    const accBalModel = require('./models/accountBalSchema');
    const routes = require('./routes/transact-routes');
    routes(app);
};