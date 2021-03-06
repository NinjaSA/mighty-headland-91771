var User = require('mongoose').model('User');
var Technique = require('mongoose').model('Technique');
var jwt = require('jsonwebtoken');
var config = require('./config/config');
var _ = require('underscore');

exports.loginUser = function(req, res){
    var query = { email: req.body.email };

    User.findOne(query, function(err, user){
        var token;

        if(!user){
            res.send('User not found');
            return;
        }

        if(user.validatePassword(req.body.password)) {
            token = jwt.sign(user, config.SECRET);
        }
        else{
            res.send('Wrong email or password!' );
            return;
        }

        Technique.find({}, function(err, techniques){

            User.find({}, function(err, users){
                res.send({
                    currentUser: user.toJSON(),
                    users: users,
                    techniques: techniques,
                    token: token
                });

            });

        });

    });
}

exports.addUser = function(req, res){
    var newUser = new User();
    req.body.password = newUser.generateHash(req.body.password);

    User.findOne({ email: req.body.email }, function(err, user){
        if(user) {
            res.send({
                hasUser: true,
                message: 'User already exists'
            });
        }
        else{
            User.create(req.body, function(err, user){
                var token = jwt.sign(user, config.SECRET);

                res.send({
                    user: user,
                    token: token
                });
            });
        }
    });
}

exports.updateUser = function(req, res){
    if(req.body.password){
        var newUser = new User();
        req.body.password = newUser.generateHash(req.body.password);
    }

    User.findById(req.body._id, function(err, user){
        _.extend(user, req.body);

        user.save(function(){
            res.send(user);
        });
    });
}

exports.removeUser = function(req, res){
    User.remove({ _id: req.query.id }, function(err){
        res.send({ message: 'Ninja has been deleted' });
    });
}

exports.addTechnique = function(req, res){
    Technique.create(req.body, function(err, technique){
        res.send(technique);
    });
}

exports.updateTechnique = function(req, res){
    Technique.findById(req.body._id, function(err, technique){
        technique.name = req.body.name;
        technique.description = req.body.description;
        technique.group = req.body.group;
        technique.category = req.body.category;
        technique.image = req.body.image;
        technique.uploadedBy = req.body.uploadedBy;
        technique.videoUrl = req.body.videoUrl;

        technique.save(function(){
            res.send(technique);
        });
    });

    // jwtUser(req.headers.authorization, res, function(decodedUser){ });
}

exports.removeTechnique = function(req, res){
    Technique.remove({ _id: req.query.id }, function(err){
        res.send({ message: 'Technique has been deleted' });
    });
}

function jwtUser(headers, res, callback){
    if(headers){
        jwt.verify(headers, config.SECRET, function(err, decodedUser){
            callback(decodedUser);
        });
    }
    else{
        res.send('No token being passed in header!');
    }
}
