  const mongoose = require('mongoose');
  let Schema = mongoose.Schema;

  const menuitemSchema = new Schema({
      _id: Schema.Types.ObjectId,
      menu_category: {
          type: Schema.Types.ObjectId,
          ref: 'MenuCategory'
      },
      restaurant: {
          type:Schema.Types.ObjectId,
          ref: 'Restaurant'
      },
      name: {
          type:String,
          required: [true, 'A name for the menu item is required']
      },
      description: {
          type: String,
          required: [true, 'A description of the menu item is required']
      },
      imagePath: {
          type: String
      },
      price:{
          type: Number,
          required:[true, 'A price is required for the menu item']
      },
      featured:{
          type: Boolean,
          default: false
      },
      popular:{
          type: Boolean,
          default: false
      },
      is_catering:{
          type: Boolean,
          default: false
      },
      date_created: Date,
      dated_updated: Date
  });

  module.exports = mongoose.model('MenuItem', menuitemSchema)