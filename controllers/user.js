const User = require('../models/user');
const bcrypt = require('bcryptjs');
module.exports = {
    findById: (id, callback) => {
        console.log('ID: ' + id);
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
                    usr.save()
                    .then(result => {
                        callback(null, usr);
                    }).catch(err => {
                        callback(err, null);
                    });
                }    
            })
        })
        
    },
    authenticate: (user, password) => {
        return bcrypt.compare(user.password, password);
    }
}