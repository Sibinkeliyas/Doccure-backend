const mongoose = require('mongoose')
const patientId = require('../../model/user/userLoginSchema')

const doctorSchema = mongoose.Schema ({
      doctorName : {
        type : String , 
        required : true
      } ,
      specialityId : {
        type : mongoose.Types.ObjectId ,
        require : true
      } ,
      speciality : {
        type : String , 
        required : true
      } ,
      picture : {
        type : String | undefined , 
      } , 
      gender : {
        type : String , 
        require : true
      } , 
      email : {
        type : String, 
        required : true
      } , 
      phone : {
        type : Number ,
        required : true
      } ,
      password : {
        type : String , 
        required : true
      } ,
      timeSchedule : {
        type : Array 
      },
      education : {
        type : Object 
      } ,
      reviews : {
        type : Array,
        ref: patientId 
      } ,
      rating : {
        type : Number 
      } ,
      aboutMe : {
        type : String | undefined
      } ,
      clinicDetails : {
        type :Object
      } ,
      consultingFee : {
        type : Number | undefined
      } ,
      dob : {
        type : String | undefined,
      } ,
      count : {
        type : Array
      } ,
      status : {
        type : Boolean ,
        required : true
      } ,
      lastvisit : {
        type : String
      }

})

const model = mongoose.model('doctor' , doctorSchema)

module.exports = model