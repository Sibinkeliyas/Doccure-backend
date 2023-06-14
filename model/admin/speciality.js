const mongoose = require('mongoose')

const specialitySchema = mongoose.Schema ({
      speciality : {
        type : String ,
        require : true
      } ,
      specialityImage : {
            type : String
        }
})

const model = mongoose.model('speciality' , specialitySchema)

module.exports = model
