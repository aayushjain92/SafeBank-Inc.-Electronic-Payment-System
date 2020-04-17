'use strict';

// defining all the entry point for the app
module.exports = (app) => {
    const transactModel = require('./models/transactSchema');
    const accBalModel = require('./models/accountBalSchema');
    const transactRoutes = require('./routes/transact-routes');
    const beneficiaryModel = require('./models/beneficiary');
    const beneficiaryRoutes = require('./routes/beneficiary-routes');
    const userModel = require('./models/user');
    const registerRoutes = require('./routes/register-routes');
    const loginRoutes = require('./routes/login-routes');
    const accountRoutes = require('./routes/account-routes');
    transactRoutes(app);
    beneficiaryRoutes(app);
    registerRoutes(app);
    loginRoutes(app);
    accountRoutes(app);
};
