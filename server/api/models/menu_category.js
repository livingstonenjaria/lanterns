  const mongoose = require('mongoose');
  let Schema = mongoose.Schema;

  const menuCategorySchema = new Schema({
      _id: Schema.Types.ObjectId,
      name: {
          type: String,
          required: [true, 'A name for the menu category is required, for example Salad']
      },
      description: String,
      date_created: Date,
      date_updated: Date
  })
  module.exports = mongoose.model('MenuCategory', menuCategorySchema);