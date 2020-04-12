'use strict';
const mongoose = require('mongoose'),
    User = mongoose.model('user');

/**
 * Saves the new user object.
 *
 * @param user
*/
exports.save = (user) => {
    const newUser = new User(user);
    return newUser.save();
};
