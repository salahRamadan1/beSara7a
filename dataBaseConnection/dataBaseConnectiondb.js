const mongoose = require('mongoose')
module.exports.deConnection = ()=>{
    mongoose.connect('mongodb://localhost:27017/sara7a').then(()=>{
        console.log('db is connection');
    })
}