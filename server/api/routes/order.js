const express = require ('express');
const router = express.Router();
const {body} = require('express-validator')

const orderController = require('../controllers/ordercontroller');

router.post(
    '/minimum_time',
    [
        body('minimum_time')
        .not()
        .isEmpty()
        .withMessage("Minimum order time must be provided")
        .isNumeric()
        .withMessage("minimum time must be a number"),
    ],
    orderController.postOrderMinimumTime);
router.post(
    '/place/:user_id',
    [
        body('total_amount')
        .not()
        .isEmpty()
        .withMessage("Order must contain the total amount")
        .isNumeric()
        .withMessage("Amount must be a number"),
        body('address')
        .not()
        .isEmpty()
        .withMessage("  Order must contain an address"),
        body('delivery_date')
        .not()
        .isEmpty()
        .withMessage("Order must contain the total amount"),
    ],
    orderController.postOrder);
router.get('', orderController.getAllOrders);
router.get('/:user_id', orderController.getUserOrders);
module.exports = router;