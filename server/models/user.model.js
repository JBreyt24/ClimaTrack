const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail} = require('validator');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [3, "First name must be at least 3 characters long"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [3, "Last name must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [isEmail, "Invalid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"]
    },

    // Added in 5-2-24 ---------------------------
    savedLocations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    }]
    // -------------------------------------------

}, {timestamps: true});


UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value)

UserSchema.pre('validate', function (next) {  
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'Passwords Do not Match')
    }
    next()
})

UserSchema.pre('save', function (next){
    //           password      10 -> $2a&10uyh3224rb32brfnuiqhrh8rh23rhbwefbqwebfq7gr823r32r23
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash
            this.confirmPassword = undefined // clear password after hashing
            next()
        })
        .catch(err => {
            console.error("Error hashing password", err)
            next(err)
        })
})

module.exports = mongoose.model('User', UserSchema)