'use strict';

const registerService = require('../services/register-service');
const mongoose = require('mongoose'),
    User = mongoose.model('user');

/**
 * Creates a new list and sets the response.
 *
 * @param request
 * @param response
*/
exports.save = (request, response) => {
    if (!request.body.firstName) {
        return response.status(400).send({
            message: "firstName cannot be empty"
        });
    }
    if (!request.body.lastName) {
        return response.status(400).send({
            message: "lastName cannot be empty"
        });
    }

    const user = Object.assign({}, request.body);
    const result = (saveditem) => {
        response.status(201);
        response.json(saveditem);
    };
    const promise = registerService.save(user);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

// /**
//  * Throws error if error object is present.
//  *
//  * @param {Response} response The response object
//  * @return {Function} The error handler function.
//  */
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
