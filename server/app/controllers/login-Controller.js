'use strict';

const loginService = require('../services/login-service');
const mongoose = require('mongoose'),
    User = mongoose.model('user');


exports.list = (request, response) => {
    const totalQuery = request.query.total;
    const params = {};
    if (totalQuery) {
        params.total = totalQuery
    };
    const promise = loginService.Search(params);
    const result = (items) => {
        response.status(200);
        response.json(items);
        //console.log(JSON.stringify(items));
    };
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

let renderErrorResponse = (response) => {
    const errorCallback = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    };
    return errorCallback;
};