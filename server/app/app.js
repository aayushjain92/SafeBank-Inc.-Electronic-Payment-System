'use strict';

// defining all the entry point for the app
module.exports = (app) => {
    const beneficiaryModel = require('./models/beneficiary');
    const routes = require('./routes/beneficiary-routes');
    routes(app);
};