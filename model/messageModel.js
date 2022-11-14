const mongoose = require('mongoose')
const messageSchema = mongoose.Schema({
    message:String,
    userId:{type:mongoose.SchemaTypes.ObjectId  , ref:'User'}, 
    view:{
        type:mongoose.SchemaTypes.Boolean,
        default:false
    }
})
module.exports = mongoose.model('message' , messageSchema)


