const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
 
    name : {
        type : String,
        required : true
    },
    lastName : {
        type : String 
    } ,
    // age : {
    //     type : Number,
    //     required : true
    // },
    email : {
        type : String,
        require : true
    },
    phone : {
        type : Number , 
        require : true
    },
    password : {
        type : String,
        require : true
    } ,
    dob : {
        type : Date
    } ,
    bloodGroup : {
        type : String
    } ,
    address : {
        type : String
    } ,
    city : {
        type : String
    } , 
    state : {
        type : String
    } ,
    country : {
        type : String
    },
    zipCode : {
        type : Number
    } ,
    picture : {
        type : String
    } ,
    wallet : {
        type : Number ,
        required : true
    } ,
    walletSpend : {
        type : Number ,
    } ,
    status : {
        type : Boolean ,
        require : true
    } ,
    lastVist : {
        type : String ,
    } ,
    joinDate : {
        type : Date,
        required : true
    }

})

const model = mongoose.model("user",userSchema)
module.exports = model;