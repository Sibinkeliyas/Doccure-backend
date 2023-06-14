const mongoose = require('mongoose')
const doctorId = require('../../model/doctor/doctorSchema')

const favoriteSchema = mongoose.Schema({
    doctorId : [{ 
      type: mongoose.Types.ObjectId, 
      ref: doctorId 
    }],
    userId : {
        type : mongoose.Types.ObjectId ,
        require : true
    }
  });

const model = mongoose.model('favoriteDoc' , favoriteSchema)

module.exports = model