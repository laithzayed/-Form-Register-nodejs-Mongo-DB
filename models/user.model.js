 const mogoose = require('mongoose');
 const bcrypt =require('bcrypt');
 const { Schema } = mogoose;
 const UserSchema = new Schema({
    name:{
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      index:true,
      unique:true
    },
    password: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
    // avatar: {
    //     type: String,
    //     required:false
    // }
  });
  UserSchema.pre('save',async function (next){
      if(!this.isModified('password')){
          return next();
      }

try {
 const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password,salt);
  this.password=hash;
  next();
}
catch (e){
    return next(e);
}
  });



 const User = mogoose.model('User', UserSchema);
  module.exports = User;
//  module.exports=userController;