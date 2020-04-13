'use strict';
const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;
const userSchema = require("./user").UserSchema;
/**
 * Mongoose schema for todolist object.
 */
let AccBalSchema = new Schema({

    user: userSchema,

    AccountNumber: {
        type: String,
        default: function getShortId(){
           let accNum = shortid.generate();
           return accNum.toUpperCase();
        }
    },
    
    CurrentBalance: { 
        type : Number,
        default: 0,
    },

    status: {
        type: String,
        enum : ['active','inactive', 'deleted'],
        default: 'active'
    },
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

module.exports = mongoose.model('accounts', AccBalSchema);