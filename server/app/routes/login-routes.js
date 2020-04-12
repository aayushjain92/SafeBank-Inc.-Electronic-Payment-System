'use strict';

const loginController = require('../controllers/login-Controller');

module.exports = (app) => {
    app.route('/login').get(loginController.list);
};
 