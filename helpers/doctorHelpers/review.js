const { default: mongoose } = require('mongoose')
const doctorSchema = require('../../model/doctor/doctorSchema')

module.exports = {
    doReplyReview : ({doctorId , patientId , replay ,replayDate}) => {
       return new Promise((resolve, reject) => {
         doctorSchema.findOne({_id : doctorId}).then((data) => {
            let doctorReview = data.reviews.findIndex((review) =>  
            review.patientId == patientId 
            && 
            !review.replay)
           if(doctorReview !== -1) {
             doctorSchema.updateOne({_id : mongoose.Types.ObjectId(doctorId) ,
                 'reviews.patientId' : mongoose.Types.ObjectId(patientId)} ,
                  {
                    $set : 
                        {
                            'reviews.$.reply' : replay ,
                            'reviews.$.replayDate' : replayDate
                        }
                    },
                    {
                        upsert : true
                    }).then((data) => {
                        console.log(data);
                        resolve(data)
                    }).catch((err) => {
                        reject(err)
                    })
           } else {
            reject('You can only reply once')
           }
        })
       })
    }
}