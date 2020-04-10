'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for todolist object.
 */
let AccBalSchema = new Schema({

    AccountNumber: {
        type: String,
        required: [true, 'Account Number is required']
    },
    
    CurrentBalance: { 
        type : Number
    }
},
    {
        versionKey: false
    });

// Duplicate the id field as mongoose returns _id field instead of id.
AccBalSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
AccBalSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('balances', AccBalSchema);