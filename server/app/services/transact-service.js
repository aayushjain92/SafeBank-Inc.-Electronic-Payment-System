'use strict';
const mongoose = require('mongoose'),
Transaction = mongoose.model('transactions');


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

