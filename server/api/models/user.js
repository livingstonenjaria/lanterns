  const mongoose = require('mongoose');
  let Schema = mongoose.Schema;

  const userSchema = new Schema({
      _id: Schema.Types.ObjectId,
      firstname:{
          type: String,
          required:[true, 'User must provide a firstname'],
          trim:true,
          lowercase:true
      },
      lastname:{
          type: String,
          required:[true, 'User must provide a lastname'],
          trim:true,
          lowercase:true
      },
      phone:{
          type:String,
          required:[true, 'User must provide a phone number'],
          trim:true
      },
      email:{
          type:String,
          required:[true, 'User must provide an email address'],
          trim:true,
          unique:true,
          match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      },
      password:{
          type: String,
          required:[true, 'User must provide a password'],
          trim:true,
      },
      date_created:{
          type: Date
      },
        date_updated:{
          type: Date
      },
      is_admin:{
          type:Boolean,
          default:false
      },
      is_staff: {
          type: Boolean,
          default: false
      },
      is_superadmin: {
          type: Boolean,
          default: false
      }
    

  });
module.exports = mongoose.model('User', userSchema)