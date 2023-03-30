const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const UserSchema = new Schema({
    userName: {
        type: String, 
        required: true, 
        unique: true,
        maxLength: 10
    },
    gender:{
        type: String, 
        required: true, 
        enum: [
            'Male',
            'Female',
            'male',
            'female'
        ]
    },
    age: {
        type: Number,
        required: true
    },
    email:{
        type: String, 
        required: true,
        unique: true,
        validate: (email) => validator.isEmail(email)
    }, 
    password:{
        type: String, 
        required: true,
        validate: (password) => validator.isStrongPassword(password) 
    }, 
    firstName:{
        type: String, 
        required: true
    }, 
    lastName:{
        type: String, 
        required: true
    }
}, {
    timestamps: true
})

UserSchema.pre('save', function(next) {
    this.userName = this.userName.toUpperCase()
    this.firstName = this.firstName.toUpperCase()
    this.lastName = this.lastName.toUpperCase()

    next()
})

UserSchema.pre('save', function(next) {
    this.userName = this.userName.trim()
    this.firstName = this.firstName.trim()
    this.lastName = this.lastName.trim()

    next()
})

UserSchema.post('save', function(next) {
    this.gender = this.gender.toUpperCase()
})
module.exports = mongoose.model('User', UserSchema);