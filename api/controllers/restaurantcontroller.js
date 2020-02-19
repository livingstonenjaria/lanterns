const mongoose = require('mongoose')
const Restaurant = require('../models/restaurant')
const {validationResult} = require('express-validator')

const errorString = require('../util/config/error_string.json')

exports.postRestaurant = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: errors.array()[0].msg
        });
    }
    const restaurant = new Restaurant({
        _id: new mongoose.Types.ObjectId(),
        imagePath: req.body.imagePath,
        name: req.body.name,
        cuisines: req.body.cuisines,
        phone: req.body.cuisines,
        description: req.body.description,
        date_created: Date.now()
    });
    restaurant.save()
    .then(results=>{
        res.status(201).json({
            message: 'Restaurant created successfully'
        })
        console.log("Restaurant saved");
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            message: errorString.serverError
        })
    })
}
exports.getRestaurants=(req, res, next) =>{
    Restaurant.find().then(restaurants => {
        res.status(201).json(restaurants)
    }).catch(err =>{
        console.log(err);
        res.status(500).json({
            message: errorString.serverError
        })
    });
}
