const mongoose = require('mongoose')
const MenuItem = require('../models/menu_item')
const {validationResult} = require('express-validator')
const errorString = require('../util/config/error_string')

exports.postmenuItems = (req,res,next) =>{
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
    const menuItem = new MenuItem({
        _id: new mongoose.Types.ObjectId(),
        menu_category: req.body.menu_category,
        restaurant: req.body.restaurant,
        name: req.body.name,
        description: req.body.description,
        imagePath: imagePath,
        price: req.body.price,
        featured: req.body.featured,
        popular: req.body.popular,
        is_catering: req.body.is_catering,
        date_created: Date.now()
    });
    menuItem.save().then(results =>{
        res.status(201).json({
            message:"Menu item created successfully"
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
           message: errorString.serverError 
        })
    });
}
exports.getmenuItems = (req, res, next) => {
    MenuItem.find().
    populate('menu_category', 'name').
    exec((err, menuitems) => {
        if (err){
            console.log(err);
            return res.status(404).json({
                message: errorString.menuItemNotFound
            })
        }
        return res.status(201).json(menuitems)

    });
}
exports.getmenuPerRestaurant= (req, res, next) =>{
    const query = {
        restaurant : req.params.restaurant
    }
    MenuItem.find(query)
    populate('menu_category', 'name')
    .then(menu =>{
        res.status(201).json(menu);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            message: errorString.serverError
        })
    });
}
exports.getmenuPerCategory= (req, res, next) =>{
    const query = {
        menu_category : req.params.category
    }
    MenuItem.find(query)
    .then(menu =>{
        res.status(201).json(menu);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            message: errorString.serverError
        })
    });
}