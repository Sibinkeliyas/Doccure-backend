const mongoose = require('mongoose')
const doctorId = require('../../model/doctor/doctorSchema')
const userId = require ('../../model/user/userLoginSchema')

const bookigSchema = mongoose.Schema({
     doctorId : { 
      type: mongoose.Types.ObjectId, 
      ref: doctorId 
    },
    userId : {
        type : mongoose.Types.ObjectId ,
        ref : userId
    } ,
    orderDate : {
        type : String ,
        require : true
    } ,
    totalAmount : {
        type : Number ,
        require : true 
    } ,
    paymentMethod : {
        type : String ,
        require : true
    } ,
    videoCall : {
        type : Boolean ,
        require : true
    } ,
    time : {
        type : Object ,
        require : true
    } ,
   appointmentStatus : {
        type : String ,
        require : true
   } ,
   firstName : {
        type : String ,
        require : true
   },
    lastName : {
        type : String ,
        require : true
    } ,
    email : {
        type : String ,
        require : true
    },
    phone : {
        type : Number ,
        require : true
    } ,
    date : {
        type : Date ,
        require : true
    }
})

const model = mongoose.model('bookings' , bookigSchema)

module.exports = model