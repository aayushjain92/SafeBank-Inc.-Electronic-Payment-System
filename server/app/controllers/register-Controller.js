'use strict';

const registerService = require('../services/register-service');
const accountService = require('../services/account-service');
const emailService = require('../services/email-service');
const mongoose = require('mongoose'),
    User = mongoose.model('user');

exports.list = (request, response) => {
    const params = {};
    const promise = registerService.Search(params);
    const result = (items) => {
        response.status(200);
        response.json(items);
    };
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

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
    let newUser;
    let newAccount;
    const user = Object.assign({}, request.body);
    const result = (saveditem) => {
        // response.status(201);
        newUser = saveditem;
        //Create account
        const account = {
            user: newUser
        };
        const accResult = (savedAccitem) => {
            // response.status(201);
            newAccount = savedAccitem;
        };
        const accPromise = accountService.save(account);
        accPromise
            .then(accResult)
            .catch(renderErrorResponse(response));

        console.log(newUser);
        console.log(newAccount);

        console.log("prior email service");
        //call to email service
        emailService.sendEmail(newUser);

        response.json(saveditem);
        response.json(newUser);
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
