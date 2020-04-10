'use strict';
//import transact service.
const Service = require('../services/transact-service');


/**
 * Creates a new transaction with the request JSON and
 * returns transaction JSON object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.post = function (request, response) {
    const newtransaction = Object.assign({}, request.body);
    const resolve = (transaction) => {
        response.status(200);
        response.json(transaction);
    };
    Service.save(newtransaction)
        .then(resolve)
        .catch(renderErrorResponse(response));
};




/**
 * Throws error if error object is present.
 *
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */
let renderErrorResponse = (response) => {
    const errorCallback = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    }
    return errorCallback;
};