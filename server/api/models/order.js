  const mongoose = require('mongoose');
  let Schema = mongoose.Schema;

  const orderItemSchema = new Schema({
      menu_item: {
          type: Schema.Types.ObjectId,
          ref: 'MenuItem'
      },
      quantity: {
          type: Number,
          required: [true, 'A quantity is required'],
          default: 1
      },
      price: {
          type: Number,
          required: [true, 'Price is required for order item']
      }
  });

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
      menu_items:[orderItemSchema],
      status:{
          type:String,
          lowercase:true,
          default:'pending'
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