const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = Schema({
    name: {type:string},
    email:{ type:string, required:true, index:true, unique:true},
    password: {type:string, required:true},
    joined: { type:Date, default: new Date()}

});

const User = mongoose.model('User', UserSchema);
module.exports = User;