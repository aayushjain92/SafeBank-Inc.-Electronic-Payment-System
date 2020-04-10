'use strict';

const transactService = require('../services/transact-service');
const mongoose = require('mongoose'),
Transact = mongoose.model('transact');


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
   
    if (!request.body.accountNumber) {

        return response.status(400).send({
            message: "accountNumber cannot be empty"
        });
    }
    

    const beneficiary = Object.assign({}, request.body);
    const result = (saveditem) => {
        response.status(201);
        response.json(saveditem);
    };
    const promise = beneficaryService.save(beneficiary);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};
/**
 * Sets response for item search and return all.
 *
 * @param request
 * @param response
*/
exports.list = (request, response) => {

    const params = {};

    const promise = beneficaryService.Search(params);
    const result = (items) => {
        response.status(200);
        response.json(items);
    };
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};



// delete the beneficiary based on the accountnumber

exports.delete = (request, response) => {
    const accountId = request.params.accountNumber;


    const promise = beneficaryService.delete(accountId);
    promise
        .then(beneficiary => {
            if (beneficiary) {
                return response.status(200).json({
                    message: "Account deleted"
                });
            } response.status(404).json({
                message: "Account not found"
            });

        })
        .catch(err => {
            response.status(500).json({
                message: "enter correct Account Number",
            });
        });
}

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



// get method for the finding items by passing id it will return 1 item
exports.get = (request, response) => {
    const accountId = request.params.accountNumber;

    const total = beneficaryService.search(accountId)
        .then(item => {

            response.status(200).json(item);
        })
        .catch(err => {
            response.status(500).json({
                message: "not proper id formAT"
            });
        });
};