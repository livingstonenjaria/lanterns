const express = require ('express');
const router = express.Router();
const {body} = require('express-validator')

const restaurantController = require('../controllers/restaurantcontroller');

router.post(
    '/create', 
    [
        body('imagePath')
        .not()
        .isEmpty()
        .withMessage("An image of the restaurant is required, please a upload a high resolution image"),
        body('name')
        .not()
        .isEmpty()
        .withMessage("A name for the restaurant is required"),
        body('phone')
        .not()
        .isEmpty()
        .withMessage("A phone number for the restaurant must be provided")
    ], 
    restaurantController.postRestaurant);
router.get('', restaurantController.getRestaurants);

module.exports = router;