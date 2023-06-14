const mongoose = require('mongoose')

const message = mongoose.Schema({
    doctorId : {
        type : mongoose.Types.ObjectId ,
        require : true
    } ,
    userId: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    message : {
        type : Array ,
        require : true
    } ,
    user : {
        type : Number ,
        required : true
    } ,
    doctor : {
        type : Number ,
        required : true
    }
})
message.index({'message.$.messagedAt' : 1}, {expireAfterSeconds: 3600} )
const model = mongoose.model("message" , message)
module.exports = model