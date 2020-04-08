'use strict';

// defining all the entry point for the app
module.exports = (app) => {
    const transactModel = require('./models/transactSchema');
    const routes = require('./routes/transact-routes');
    routes(app);
};