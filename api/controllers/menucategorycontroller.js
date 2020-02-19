const mongoose = require('mongoose')
const MenuCategory = require('../models/menu_category')
const {validationResult} = require('express-validator')
const errorString = require('../../util/config/error_string.json')

exports.postmenuCategory = (req, res ,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array()[0].msg});
    }

    const menuCategory = new MenuCategory({
         _id: new mongoose.Types.ObjectId(),
         name: req.body.name,
         description: req.body.description,
         date_created: Date.now()
    })
    menuCategory.save()
    .then(results =>{
        return res.status(201).json({
            message: 'Menu category created successfully'
        })
    })
    .catch(err =>{
        // console.log(err)
        return res.status(500).json({
            message: errorString.serverError
        })
    })

}
exports.getmenuCategories = (req, res, next) => {
    MenuCategory.find().then(menucategories => {
        res.status(201).json(menucategories)
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: errorString.serverError
        })
    });
}