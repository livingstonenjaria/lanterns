  const mongoose = require('mongoose');
  let Schema = mongoose.Schema;

  const minOrderTimeSchema = new Schema({
      _id: Schema.Types.ObjectId,
      minimum_time : {
          type: Number,
          required: true
      },
      date_created:Date
  });
  module.exports = mongoose.model('MinOrderTime', minOrderTimeSchema);