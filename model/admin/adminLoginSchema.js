const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    profile : {
        type : String , 
    } ,
    email : {
        type : String,
        required : true
    },
    phone : {
        type : Number , 
    },
    password : {
        type : String,
        required : true
    }
})

const model = mongoose.model("admin",adminSchema)
module.exports = model;