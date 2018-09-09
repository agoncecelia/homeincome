const User = require('../models/user');
const bcrypt = require('bcryptjs');
module.exports = {
    findById: (id, callback) => {
        User.findById(id, (err, result) => {
            callback(err, result);
        })
    },
    findByEmail: (email, callback) => {
        User.findOne({email: email}, (err, result) => {
            callback(err, result);
        })
    },
    create: (user, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) {
                callback(err, null);
                } else {
                    let usr = new User(user);
                    usr.password = hash
                    usr.save();
                    callback(null, usr);
                }    
            })
        })
        
    },
    authenticate: (user, password) => {
        return bcrypt.compare(user.password, password);
    }
}