const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxLength: 20
    },
    password:{
        type:String,
        minLength: 5
    },
    email: {
        type:String,
        trim: true
    },
    lastname:{
        type:String,
        maxlength:20
    },
    role:{
        type:Number,
        default: 0
    },
    image:String,
    token:{
        type:String
    },
    tokenExp:{
        type: Number
    }
})

userSchema.pre('save', function( next ) {

    let user = this;
    // 비밀번호를 암호화 시킨다.
    // 암호화 시키기 위해 ..

    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) return next(err)

            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) return next(err)
                user.password = hash;
                next();
            })
        })
    } else {
        next()
    }
})


userSchema.methods.comparePassword = function(plainPassword, cb){
    console.log("plainPassword : "+ plainPassword)
    console.log("this.password : " + this.password)
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
            cb(null,isMatch)
    })
}

userSchema.methods.generateToken = function(cb){

    let user = this;
    let token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token

    user.save(function(err,user){
        if(err) return cb(err)
        cb(null,user)
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;
    
    jwt.verify(token, 'secretToken', function(err, decoded){
        user.findOne({
            "_id" : decoded,
            "token" : token
        }
        ,function(err,user){
            if(err) return cb(err);
            cb(null,user);
        })
    })
}


const User = mongoose.model('User', userSchema)

module.exports = {User}