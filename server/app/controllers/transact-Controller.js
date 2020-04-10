'use strict';
//import transact service.
const Service = require('../services/transact-service');


exports.new = async function (request, response) {
    const newtransaction = Object.assign({}, request.body);
    try {       
        if(newtransaction.type == "debit"){
            const balanceObj1 = await Service.search({AccountNumber:newtransaction.ownerAccountNum}); 
            if(balanceObj1.CurrentBalance < newtransaction.amount){
                throw"Insufficient Funds";
            }else{
                const balanceObj2 =  await Service.update(balanceObj1, balanceObj1.CurrentBalance - newtransaction.amount);
            }           
        }else if(newtransaction.type == "credit"){
            const balanceObj2 = await Service.search({AccountNumber:newtransaction.ownerAccountNum}); 
            const balanceObj3 = await Service.update(balanceObj2, balanceObj2.CurrentBalance + newtransaction.amount);
            
        }else if(newtransaction.type == "transfer"){
            // const balanceObj1 = await Service.search({AccountNumber:"1234567890"});      
            // const balanceObj2 = await Service.search({AccountNumber:"0987654321"});
            // console.log(`Got the final result: ${balanceObj1}`);
            // console.log(`Got the final result: ${balanceObj2}`);
        }
        const resolve_new = (transaction) => {
            response.status(200);
            response.json(transaction);
        };
    
        Service.save(newtransaction)
            .then(resolve_new)
            .catch(renderErrorResponse(response));

      } catch(error) {
        renderErrorResponse(response);
      }

};

/**
 * Creates a new transaction with the request JSON and
 * returns transaction JSON object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.put = function (request, response) {
    const newtransaction = Object.assign({}, request.body);
    const resolve_new = (transaction) => {
        response.status(200);
        response.json(transaction);
    };

    Service.save(newtransaction)
        .then(resolve_new)
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