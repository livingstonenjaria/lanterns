const express = require('express');
const router = express.Router();
const {body} = require('express-validator')

const menucategorycontroller = require('../controllers/menucategorycontroller');
const menuitemcontroller = require('../controllers/menuitemcontroller');

router.post(
  "/create",
  [
    body('name')
      .not()
      .isEmpty()
      .withMessage(
        "A name for the menu category is required, for example Salad"
      )
      .trim()
  ],
  menucategorycontroller.postmenuCategory
);
router.get('', menucategorycontroller.getmenuCategories);
router.get('/category/:category', menuitemcontroller.getmenuPerCategory);

module.exports = router;