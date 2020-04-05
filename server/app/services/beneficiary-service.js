'use strict';
const mongoose = require('mongoose'),
    Beneficiary = mongoose.model('beneficiary');


// seach for all the Beneficiary
exports.Search = (params) => {
    const promise = Beneficiary.find(params).exec();
    return promise;
};

/**
 * Saves the new Beneficiary object.
 *
 * @param Beneficiary
*/
exports.save = (beneficiary) => {
    const newBeneficiary = new Beneficiary(beneficiary);
    return newBeneficiary.save();
};


/**
 * Deletes an existing order.
 *
 * @param accountNumber
// */
exports.delete = (accountId) => {

    const promise = Beneficiary.findOneAndDelete({ accountNumber: accountId }).exec();

    return promise;
};