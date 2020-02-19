  const mongoose = require('mongoose');
  let Schema = mongoose.Schema;

  const orderSchema = new Schema({
      _id: Schema.Types.ObjectId,
      user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
      },
      total_amount:{
          type: Number,
          required:[true, 'A total amount for the orders is required']
      },
      address:{
          type:String,
          required:[true, 'A deliver address is required']
      },
      delivery_date: {
          type: Date,
          required: [true, 'A date of delivery is required']
      },
      date_created: {
          type: Date
      }
  });

  module.exports = mongoose.model('Order', orderSchema);