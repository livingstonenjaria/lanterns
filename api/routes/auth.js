const express = require('express');
const router = express.Router();
const {body} = require('express-validator');

const authcontroller = require('../controllers/authcontroller');

router.post(
    '/register', 
    [
        body('email').not().isEmpty().withMessage("Oops seems like you forgot to enter your email.").isEmail().withMessage("Whoa the email you provided is broken.").trim(),
        body('password').not().isEmpty().withMessage("Oops did you forget to give a password.").isLength({ min: 8 }).withMessage("Safety is our priority and your password is a little short, minimum is 8 characters").trim(),
        body('phone').not().isEmpty().withMessage("Please provide a valid phone number.").isLength({ min: 8 }).withMessage("Phone number must be atleast 8 characters long").trim(),
        body('firstname').not().isEmpty().withMessage("Please provide a first name.").trim(),
        body('lastname').not().isEmpty().withMessage("Please provide a last name.").trim()  
    ], 
    authcontroller.registerUser);
router.post('/login', authcontroller.loginUser);

module.exports = router;