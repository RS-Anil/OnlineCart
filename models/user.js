
const _ = require('lodash');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});

// userSchema.methods.generateAuthToken = function() { 
//     const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
//     return token;
//   }

const User = mongoose.model('User', userSchema);

exports.User = User; 