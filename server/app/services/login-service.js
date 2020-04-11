'use strict';
const mongoose = require('mongoose'),
    User = mongoose.model('user');

// seach for all the users
exports.Search = (params) => {
    const promise = User.find(params).exec();
    return promise;
};
