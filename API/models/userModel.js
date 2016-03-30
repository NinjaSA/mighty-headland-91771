var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    "firstName": String,
    "lastName": String,
    "email": String,
    "password": String,
    "dojo": String,
    "isActive": Boolean,
    "isAdmin": Boolean,
    "isInstructor": Boolean,
    "level": String
});

userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.toJSON = function(){
    var user = this.toObject();

    // Fields to delete from response
    delete user.password;

    return user;
};

userSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
