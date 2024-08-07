const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/CatchAsync');

// Controllers
const users = require('../controllers/users')

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.registerUser));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.loginUser);

router.get('/logout', users.logout);

module.exports = router;