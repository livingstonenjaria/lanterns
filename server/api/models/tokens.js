const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const tokenSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    token: {
        type: String
    },
    date_created: {
        type: Date
    },
    date_updated: {
        type: Date
    }
});

module.exports = mongoose.model('Token', tokenSchema);