  const mongoose = require('mongoose');
  let Schema = mongoose.Schema;

  const orderItemSchema = new Schema({
       _id: Schema.Types.ObjectId,
      order: {
          type: Schema.Types.ObjectId,
          ref: 'Order'
      },
      menu_item: {
          type: Schema.Types.ObjectId,
          ref: 'MenuItem'
      },
      quantity:{
          type: Number,
          required: [true, 'A quantity is required'],
          default: 1
      },
      price:{
          type:Number,
          required:[true, 'Price is required for order item']
      }
  });
   module.exports = mongoose.model('OrderItem', orderItemSchema);