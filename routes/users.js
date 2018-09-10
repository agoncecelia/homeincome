const express = require('express');
const router = express.Router();
const User = require('../controllers/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


router.post('/register',  (req, res, next) => {
    let usr = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }
    User.create(usr, (err, result) => {
        if(err) {
            if(err.code == 11000) {
                res.json({
                    success: false,
                    msg: 'Email already registered.'
                })
            }
            res.json({
                success: false,
                msg: 'Unexpected error occurred.'
            })
        } else {
            res.json({
                success: true,
                msg: 'You are now registered.'
            })
        }
    })
})

router.post('/authenticate',  (req, res, next) => {
    let usr = {
        email: req.body.email,
        password: req.body.password
    }
    User.findByEmail(usr.email, (err, user) => {
        if(err) return res.json({success: false, msg: err.msg});
        
        if(!user) {
            return res.json({success: false, msg: 'User not found'});
        }

        User.authenticate(usr, user.password).then(isMatch => {
            if(isMatch) {
                const returnedUser = {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
                const token = jwt.sign(returnedUser, config.secret, {expiresIn: 604800});
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: returnedUser
                })
            } else {
                return res.json({success: false, msg: 'Wrong Password'});
            }
        }).catch(err => {
            console.log(err)
        });
    })
})

router.get('/profile',  passport.authenticate('jwt', {session: false}), (req, res, next) => {
   const user = {
       firstName: req.user.firstName,
       lastName: req.user.lastName,
       email: req.user.email,
       id: req.user.id
   }
    res.json(user);
})

module.exports = router;