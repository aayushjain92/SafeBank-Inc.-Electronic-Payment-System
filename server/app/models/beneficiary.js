'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for todolist object.
 */
let BeneficiarySchema = new Schema({

    firstName: {
        type: String,
        required: "Name is missing"
    },
    lastName: {
        type: String,
        required: "Name is missing"
    },
    accountNumber: {
        type: Number,
        required: "Number is missing"
    },
    modifiedDate: {
        type: Date,
        default: Date.now
    }
},
    {
        versionKey: false
    });
// Duplicate the id field as mongoose returns _id field instead of id.
TodoSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
TodoSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('beneficiary', BeneficiarySchema);