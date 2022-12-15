const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require("validator");
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        validate(value){
            if(value.isEmpty){
                throw new Error("Please Enter a name")
            }
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    password:{
        type: String,
        required:true,
        minlength: 3,
    },
    cpassword:{
        type: String,
        required: true,
        minlength: 3
    },
    designation:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

  UserSchema.pre('save', async function (next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
        this.cpassword =await bcrypt.hash(this.cpassword, 10);
    }
    next();
  })

  const User = mongoose.model('Users', UserSchema);
  module.exports = User;

  