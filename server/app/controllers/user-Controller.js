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
    console.log('In update method');
    const email = request.params.email;
    console.log("request in update user in controller:" + JSON.stringify(request.body));
    let updatedUser = request.body;
    let dbuser ;
    //Find by Email
    userService.searchUserByEmail(email)
        .then(item => {
            dbuser = item;
            dbuser.addressLine1 = updatedUser.addressLine1;
            
            //Update the user
            userService.update(dbuser)
                .then(updatedItem =>{
                    // console.log('object updated successfully');
                    // console.log(updatedItem);
                    response.status(200).json({
                        message : 'Profile updated for user with email id : ' + updatedItem.email
                    });
                    console.log("dbUSer:" + JSON.stringify(dbuser));
                    console.log('Done');
                })
                .catch(err => {
                    response.status(500).json({
                        message: "Unable to update the user"
                    });
                })
        })
        .catch(err => {
            response.status(500).json({
                message: "Something went wrong"
            });
        });
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