'use strict';

// defining all the entry point for the app
module.exports = (app) => {
    const beneficiaryModel = require('./models/beneficiary');
    const routes = require('./routes/beneficiary-routes');
    const userModel = require('./models/user');
    const registerRoutes = require('./routes/register-routes');
    const loginRoutes = require('./routes/login-routes');
    routes(app);
    registerRoutes(app);
    loginRoutes(app);
};