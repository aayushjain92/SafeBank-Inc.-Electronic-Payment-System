'use strict';

const beneficaryController = require('../controllers/beneficiary-Controller');

// defining all the end points for beneficary

module.exports = (app) => {
    app.route('/beneficiaries')
        .get(beneficaryController.list)
        .post(beneficaryController.save);

    app.route('/beneficiaries/:accountNumber')
        .get(beneficaryController.get)
        .delete(beneficaryController.delete);
};  