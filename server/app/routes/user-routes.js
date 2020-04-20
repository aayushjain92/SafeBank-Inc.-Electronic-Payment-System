'use strict';

const UserController = require('../controllers/user-Controller');

module.exports = (app) => {
    app.route('/users').get(UserController.list);
};
 