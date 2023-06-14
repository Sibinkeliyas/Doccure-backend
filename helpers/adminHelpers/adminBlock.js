const userShema = require('../../model/user/userLoginSchema')
const doctorShema = require('../../model/doctor/doctorSchema')

module.exports = {
    doBlockUser : ({userId , status}) => {
        return new Promise((resolve, reject) => {
            console.log(userId , status);
            userShema.updateOne({_id : userId} , {$set : {status : status}} , {upsert : true}).then((data) => {
                resolve(data)
            }).catch((err) =>{
                reject(err)
            })
        })
    } ,
    doBlockDoctor : ({doctorId , status}) => {
        return new Promise((resolve, reject) => {
            doctorShema.updateOne({_id : doctorId} , {$set : {status : status}} , {upsert : true}).then((data) => {
                resolve(data)
            }).catch((err) =>{
                reject(err)
            })
        })
    }
}