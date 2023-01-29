const {app} = require('../app');
const {userLogin,userRegister} = require('../services/userService')
const express = require("express");
const passport = require('passport');

const userRoute = express.Router();

userRoute.route("/login")
    .get()
    .post(passport.authenticate('local',{failureMessage: true }),userLogin);

userRoute.route("/register")
    .get()
    .post(userRegister);

module.exports={userRoute};