const express = require('express');
const router = express.Router();
const {body} = require('express-validator');

const menuitemcontroller = require('../controllers/menuitemcontroller');

router.post(
    '/create', 
    [
        body('menu_category').not().isEmpty().withMessage('The menu item requires a category'),
        body('restaurant').not().isEmpty().withMessage('The menu item requires a restaurant'),
        body('name').not().isEmpty().withMessage('The menu item requires a name'),
        body('description').not().isEmpty().withMessage('The menu item requires a description'),
        body('price').not().isEmpty().withMessage('The menu item requires a price')
    ], 
    menuitemcontroller.postmenuItems);
router.get('', menuitemcontroller.getmenuItems);


module.exports = router