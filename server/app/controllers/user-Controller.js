'use strict';

const userService = require('../services/user-service');
const mongoose = require('mongoose'),
    User = mongoose.model('user');


exports.list = (request, response) => {
    const totalQuery = request.query.total;
    const params = {};
    if (totalQuery) {
        params.total = totalQuery
    };
    const promise = userService.Search(params);
    const result = (items) => {
        response.status(200);
        response.json(items);
    };
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

exports.updateUser = (request, response) => {
    user = request.params.user;
    console.log("user in server service:"+ JSON.stringify(user));

    //Should user be checked whether it exists in db??

    //Update the user
    userService.update(user).then(updatedItem =>{
        console.log("user in server service update method:"+ JSON.stringify(user));
            response.status(200).json({
            message : 'Profile Updated for user: ' + updatedItem.email
        });
        console.log('Done');
    })
    .catch(err => {
        response.status(500).json({
            message: "Unable to update the user"
        });
    })
}


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