'use strict';

const beneficaryController = require('../controllers/beneficiary-Controller');

// defining all the end points for beneficary
// end point plural
module.exports = (app) => {
    app.route('/beneficiary')
        .get(beneficaryController.list)
        .post(beneficaryController.save);

    app.route('/beneficiary/:accountNumber')
        .get(beneficaryController.get)
        .delete(beneficaryController.delete);
};  