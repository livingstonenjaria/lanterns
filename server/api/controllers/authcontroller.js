const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('basic-auth');
const fs = require('fs');
const path = require('path');
const User = require('../models/user');
const Token = require('../models/tokens');
const {validationResult} = require('express-validator');
const errorString = require('../util/config/error_string.json');
const configString = require('../util/config/config.json');

const privateKeyPath = path.join(
    __dirname,'..','util','keys','private.key'
);
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

exports.registerUser = (req, res, next) => {
    const query = {
        email: req.body.email
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: errors.array()[0].msg
        });
    }
    User.findOne(query)
    .then(user=>{
        if(user){
            return res.status(409).json({
                message:errorString.emailExists
            });
        }
        return bcrypt
        .hash(req.body.password, 12)
        .then(hashedPassword =>{
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phone: req.body.phone,
                email: req.body.email,
                password: hashedPassword,
                date_created: Date.now()
            });
            return user.save();
        })
        .then(user =>{
            const jwtToken = generateToken(user);
            if(jwtToken){
                res.status(201).json({
                    message: "Yeey, your are a officially a member",
                    id:user._id,
                    token:jwtToken
                })
                // Save token to db
                const token = new Token({
                    _id: new mongoose.Types.ObjectId(),
                    user: user._id,
                    token: jwtToken,
                    date_created: Date.now()
                });
                return token.save();
            }
        })
        .catch(err =>{
            // TODO: Remove logs in production
            console.log("User save error:",err);
            res.status(500).json({
                message: errorString.serverError
            })
        });

    })
    .catch(err=>{
        // TODO: Remove logs in production
        console.log(err);
        res.status(500).json({
            message: errorString.serverError
        })
    });
}
exports.loginUser = (req, res, next) => {
    const credentials = auth(req);
    if(!credentials){
        return res.status(400).json({
            message: errorString.invalidRequest
        });
    }
    const email = credentials.name;
    const password = credentials.pass;
    User.findOne({ email:email }).then(user =>{
        if(!user){
            return res.status(401).json({
                message: errorString.userNotFound
            });
        }
        return bcrypt
        .compare(password, user.password)
        .then(comparison =>{
            if(comparison) {
                const jwtToken = generateToken(user);
                if(jwtToken){
                     return res.status(201).json({
                         message: "Glad to see you again",
                         id: user._id,
                         token: jwtToken
                     });
                }
            } else{
                 return res.status(401).json({
                     message: errorString.passwordsDontMatch
                 });
            }
        });
    }).catch(err =>{
        // TODO: Remove logs in production
        console.log(err);
        res.status(500).json({
            message: errorString.serverError
        })
    });

}
function generateToken(user){
    const payload = {
        email: user.email,
        userId: user._id
    };
    const signOptions = {
        issuer: configString.issuer,
        expiresIn: configString.expiresIn,
        algorithm: configString.encodeAlg
    }
   return jwt.sign(payload, privateKey, signOptions);
}