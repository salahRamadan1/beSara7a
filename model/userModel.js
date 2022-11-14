const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number,
    emailConfirm :{
        type:mongoose.SchemaTypes.Boolean,
        default:false
    }
})
module.exports = mongoose.model('User' , userSchema)


