const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const uuidv4 = require("uuid/v4");

const menuitemcontroller = require('../controllers/menuitemcontroller');
const Multer = require('multer');
const gcs = require('../util/uploadhelper')

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
router.post(
    '/create', 
    // [
    //     body('menu_category').not().isEmpty().withMessage('The menu item requires a category'),
    //     body('restaurant').not().isEmpty().withMessage('The menu item requires a restaurant'),
    //     body('name').not().isEmpty().withMessage('The menu item requires a name'),
    //     body('description').not().isEmpty().withMessage('The menu item requires a description'),
    //     body('price').not().isEmpty().withMessage('The menu item requires a price')
    // ], 
    multer.single("image"), sendUploadToGCS, menuitemcontroller.postmenuItems);
router.get('', menuitemcontroller.getmenuItems);
router.get('/:menuId', menuitemcontroller.getSinglemenuItem);

function sendUploadToGCS(req, res, next) {
    if (!req.file) {
        res.status(422).send({
            message: string.imageNotProvided
        });
        return;
    }
    unique_id = uuidv4();
    const gcsname = "menu_items/" + unique_id + "-" + req.file.originalname;
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
module.exports = router