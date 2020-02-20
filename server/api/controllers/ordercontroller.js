const mongoose = require('mongoose')
const MinOrderTime = require('../models/minordertime')
const Order = require('../models/order')
const {validationResult} = require('express-validator')
const errorString = require('../util/config/error_string.json')

exports.postOrder = (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: errors.array()[0].msg
        });
    }
    const query = {
        restaurant: req.params.restaurant
    }
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        user: req.params.user_id,
        total_amount: req.body.total_amount,
        address: req.body.address,
        menu_items: req.body.menu_items,
        delivery_date: req.body.delivery_date,
        date_created: Date.now()
    });
    order.save()
    .then(newOrder =>{
        return res.status(201).json({
            message:"Your order has been placed. Thank you for choosing lanterns",
            order: newOrder._id
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            message: errorString.serverError
        })
    });

}
exports.postOrderMinimumTime = (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: errors.array()[0].msg
        });
    }
    const minordertime = new MinOrderTime({
        _id: new mongoose.Types.ObjectId(),
        minimum_time: req.body.minimum_time,
        date_created: Date.now()
    });
    let update = {
        minimum_time: req.body.minimum_time,
        date_created: Date.now()
    }
    MinOrderTime.find().then(min_time=> {
        if (min_time.length > 0) {
            let query = {_id:min_time[0]._id};
            return MinOrderTime.findOneAndUpdate(query, update).then(minimum=>{
                return res.status(201).json(minimum);
            });
        }
         return minordertime.save().then(time=>{
              res.status(201).json(time);
         });
    })
    .catch(err=>{
         console.log(err);
         return res.status(500).json({
             message: errorString.serverError
         })
    })
}
exports.getAllOrders = (req,res,next)=>{
    Order.find()
    .populate('user', 'firstname lastname phone')
    .populate('menu_items.menu_item', 'name menu_category')
    .exec((err, orders) => {
        if (err) {
            console.log(err);
            return res.status(404).json({
                message: errorString.orderItemNotFound
            })
        }
        return res.status(201).json(orders)
    });
}
exports.getUserOrders = (req, res, next) => {
    query = { user : req.params.user_id }
    Order.find(query)
        .populate('menu_items.menu_item', 'name menu_category')
        .exec((err, orders) => {
            if (err) {
                console.log(err);
                return res.status(404).json({
                    message: errorString.orderItemNotFound
                })
            }
            return res.status(201).json(orders)
        });
}