  const mongoose = require('mongoose');
  let Schema = mongoose.Schema;

  const restaurantSchema = new Schema({
    _id: Schema.Types.ObjectId,
    imagePath: {
        type: String
    },
    name: {
        type: String,
        required: [true, 'The name of the restaurant is required']
    }, 
    cuisines: {
        type: String
    },  
    phone: {
        type: String,
        required: [true, 'A phone number for the restaurant is required']
    },  
    address: {
        type: String,
        required: [true, 'An address for the restaurant is required']
    },  
    description: {
        type: String
    },
    date_created: {
        type:Date
    },
    date_updated: {
        type: Date
    }
  });

module.exports = mongoose.model('Restaurant', restaurantSchema);