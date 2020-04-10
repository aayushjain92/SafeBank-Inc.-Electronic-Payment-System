'use strict';

const loginService = require('../services/login-service');
const mongoose = require('mongoose'),
    User = mongoose.model('user');