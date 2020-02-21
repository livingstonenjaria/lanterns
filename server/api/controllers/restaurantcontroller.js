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
    let imagePath
    if (req.file && req.file.cloudStoragePublicUrl) {
        imagePath = req.file.cloudStoragePublicUrl;
    }
    // if (!req.file) {
    //     return res.status(422).json({
    //         message: errorString.imageNotProvided
    //     });
    // }
    
    const restaurant = new Restaurant({
        _id: new mongoose.Types.ObjectId(),
        imagePath: imagePath,
        name: req.body.name,
        cuisines: req.body.cuisines,
        phone: req.body.phone,
        description: req.body.description,
        address: req.body.address,
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
exports.getSingleRestaurant = (req, res, next) => {
    const requestid = req.params.restaurantid;
    Restaurant.findById(requestid).then(restaurant => {
        res.status(201).json(restaurant)
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: errorString.serverError
        })
    });
}
