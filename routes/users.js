const express = require('express');
const router = express.Router();
const User = require('../controllers/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


router.post('/register',  (req, res, next) => {
    console.log('hello');
    let usr = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }
    User.create(usr, (err, result) => {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
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

        User.authenticate(usr, returnedUser.password).then(isMatch => {
            console.log(isMatch);
            if(isMatch) {
                const token = jwt.sign(user, config.secret, {expiresIn: 604800});
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName
                    }
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
   res.json(req.user);
})

module.exports = router;