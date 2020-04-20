'use strict';
const mongoose = require('mongoose'),

Account = mongoose.model('accounts'),
Transaction = mongoose.model('transactions');
/**
 * Returns an array of account number object matching the search parameters.
 *
 * @param {Object} params {Search parameters}
 */
exports.search = async function (params) {
    try{
        const acc = await Account.findOne(params);   
        return acc;
    } catch (error) {
        throw error;
    }
};

/**
 * Returns the account object matching the id.
 */
exports.update = function (account, amount) {
    
    return new Promise(async(resolve, reject)=>{
        try{      
            account.CurrentBalance = amount;
            await Account.findOneAndUpdate({_id: account._id}, account);
            resolve(true);
        } catch (error) {
            reject(error);
        }
    }
    )

};

exports.transfer = function (transaction, ownerAccount, beneficiaryAccount) {
 
    return new Promise(async(resolve, reject)=>{
        try{      
            ownerAccount.CurrentBalance = ownerAccount.CurrentBalance - transaction.amount;
            beneficiaryAccount.CurrentBalance = beneficiaryAccount.CurrentBalance + transaction.amount;
            await Account.findOneAndUpdate({_id: ownerAccount._id}, ownerAccount);
            await Account.findOneAndUpdate({_id: beneficiaryAccount._id}, beneficiaryAccount);
            resolve(true);
        } catch (error) {
            reject(error);
        }
    }
    )

};


/**
 * Saves and returns the new transaction object.
 *
 * @param {Object} transaction {transaction object}
 */
exports.save = async function (transaction) {
    const transactionData = new Transaction(transaction);
    const tx = await transactionData.save(transactionData);
    return tx;
};

