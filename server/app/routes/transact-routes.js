'use strict';

const transactController = require('../controllers/transact-Controller');

// defining all the end points for transact

module.exports = (app) => {
    app.route('/transactions')
        .get(transactController.list)
        .post(transactController.save);
};  