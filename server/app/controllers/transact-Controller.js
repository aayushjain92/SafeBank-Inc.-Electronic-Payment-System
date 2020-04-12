'use strict';
//import transact service.
const Service = require('../services/transact-service');

// handles the transfer of funds from the requestor's account to beneficiary account
exports.transfer = async function (request, response) {
    try{
        const transaction = Object.assign({}, request.body);
    
        // owner account existence and balance verification
        const ownerAccount = await Service.search({AccountNumber:transaction.ownerAccountNum});
        if(!ownerAccount || ownerAccount.CurrentBalance < transaction.amount){
            return response.json({
                status: 401,
                message: "Account doesnt exist or Insufficient Funds"
            });
        }

        // beneficiary account existence
        const beneficiaryAccount = await Service.search({AccountNumber:transaction.beneficiaryAccountNumber});
        if(!beneficiaryAccount){
            return response.json({
                status: 401,
                message: "beneficiary acc doesn't exist"
            });
        }

        // transfer funds
        await Service.transfer(transaction, ownerAccount, beneficiaryAccount);

        // logging transaction 
        const tx = await Service.save(transaction);
        return response.json({
            status: 200,
            message: "transaction successful",
            data: tx
        });


    }catch(error){
        return response.json({
            status: 401,
            message: error.message
        });
    }

     
}

// the below function credits the amount to the requestor's account
exports.credit = async function (request, response) {
    try{
        const transaction = Object.assign({}, request.body);
    
        // verify owner's account existence 
        const ownerAccount = await Service.search({AccountNumber:transaction.ownerAccountNum});
        if(!ownerAccount || ownerAccount.CurrentBalance < transaction.amount){
            return response.json({
                status: 401,
                message: "Account doesnt exist"
            });
        }

        // credit the amount to the owner's account 
        await Service.update(ownerAccount, ownerAccount.CurrentBalance + transaction.amount);
        
        // logging transaction        
        const tx = await Service.save(transaction);
        return response.json({
            status: 200,
            message: "transaction successful",
            data: tx
        });


    } catch(error) {
        return response.json({
            status: 401,
            message: error.message
        });
    }

};


// the below function debits the amount from the requestor's account
exports.debit = async function (request, response) {
    try{
        const transaction = Object.assign({}, request.body);
    
        // verify owner's account existence 
        const ownerAccount = await Service.search({AccountNumber:transaction.ownerAccountNum});
        if(!ownerAccount || ownerAccount.CurrentBalance < transaction.amount){
            return response.json({
                status: 401,
                message: "Account doesnt exist or Insufficient Funds"
            });
        }

        // debit the amount from the owner's account 
        await Service.update(ownerAccount, ownerAccount.CurrentBalance - transaction.amount);
        
        // logging transaction        
        const tx = await Service.save(transaction);
        return response.json({
            status: 200,
            message: "transaction successful",
            data: tx
        });


    } catch(error) {
        return response.json({
            status: 401,
            message: error.message
        });
    }

};