'use strict';
const mongoose = require('mongoose'),
Balance = mongoose.model('balances'),
Transaction = mongoose.model('transactions');



/**
 * Returns an array of account number object matching the search parameters.
 *
 * @param {Object} params {Search parameters}
 */
exports.search = function (params) {
    const promise = Balance.findOne(params).exec();
    return promise;
};


/**
 * Returns the balance object matching the id.
 */
exports.update = function (balance, amount) {
    balance.CurrentBalance = amount;
    // console.log(balance);
    // console.log(amount);
    const promise = Balance.findOneAndUpdate({_id: balance._id}, balance).exec();
    return promise;
};

/**
 * Saves and returns the new transaction object.
 *
 * @param {Object} transaction {transaction object}
 */
exports.save = function (transaction) {
    
    const newTransaction = new Transaction(transaction);
    const promise = newTransaction.save();
    return promise;
};

