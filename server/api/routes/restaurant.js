const express = require ('express');
const router = express.Router();
const uuidv4 = require("uuid/v4");
const {check, body} = require('express-validator')
const Multer = require('multer');
const gcs =  require('../util/uploadhelper')


const restaurantController = require('../controllers/restaurantcontroller');
const menuitemcontroller = require('../controllers/menuitemcontroller');
// Multer SetUp
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024 // no larger than 5mb
    }
});

const lanternsFileBucket = gcs.bucket('lanterns_bucket');

router.post('/create', 
    // [
    //     check('name')
    //     .not()
    //     .isEmpty()
    //     .withMessage("A name for the restaurant is required"),
    //     check('address')
    //     .not()
    //     .isEmpty()
    //     .withMessage("A address for the restaurant is required"),
    //     check('phone')
    //     .not()
    //     .isEmpty()
    //     .withMessage("A phone number for the restaurant must be provided")
    // ], 
    multer.single("image"), sendUploadToGCS, restaurantController.postRestaurant);
router.get('', restaurantController.getRestaurants);
router.get('/:restaurantid', restaurantController.getSingleRestaurant);
router.get('/menu/:restaurant/:menu_id', menuitemcontroller.getmenuPerRestaurant);
function sendUploadToGCS(req, res, next) {
    if (!req.file) {
        res.status(422).send({
            message: string.imageNotProvided
        });
        return;
    }
    unique_id = uuidv4();
    const gcsname = "restaurants/"+ unique_id +"-" + req.file.originalname;
    const file = lanternsFileBucket.file(gcsname);
    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        },
        resumable: false
    });

    stream.on('error', (err) => {
        req.file.cloudStorageError = err;
        res.status(500).send(err);
        next(err);
    });

    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname;
        file.makePublic().then(() => {
            req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
            next();
        });
    });

    stream.end(req.file.buffer);
}

function getPublicUrl(filename) {
    return `https://storage.googleapis.com/${lanternsFileBucket.name}/${filename}`;
}
module.exports = router;