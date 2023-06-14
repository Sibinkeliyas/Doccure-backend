const { default: mongoose } = require('mongoose')
const userSchema = require('../../model/user/userLoginSchema')
const passwordHashing = require('../commonHelpers/passwordHashing')

module.exports = {
    doEditProfile : (data) => {
       return new Promise(async(resolve, reject) => {
        try {
            let user = await userSchema.findOne({email : data.email , _id : {$ne : mongoose.Types.ObjectId(data._id)}})
            if(!user) {
                let updataUser = await userSchema.findOne({_id :  mongoose.Types.ObjectId(data._id)})
                if(updataUser) {
                    userSchema.updateOne({_id : mongoose.Types.ObjectId(data._id)} ,{ $set : {
                        email : data.email , 
                        name : data.name ,
                        lastName : data.lastName ,
                        dob : data.dob ,
                        bloodGroup : data.bloodGroup ,
                        phone : data.phone ,
                        address : data.address ,
                        city : data.city ,
                        zipCode : data.zipCode ,
                        country : data.country , 
                        picture : data.picture ,
                         }}).then(() => {
                        resolve(data)
                    }).catch((err) => {
                        reject(err)
                    })
                } else {
                    userSchema.create(data).then(() => {
                        resolve(data)
                    }).catch((err) => {
                        reject(err)
                    })
                }
            } else {
                reject("email already exist")
            }
        } catch (err) {
            reject(err)
        }
       })
    } ,
    doEditPassword : (data) => {
        return new Promise(async(resolve, reject) => {
            try {
              let user = await  userSchema.findOne({email : data.email})
              if(user) {
                passwordHashing.doBcryptCompare(data.oldPassword , user.password).then((res) => {
                    passwordHashing.doBcrypt(data.password).then((password) => {
                        userSchema.updateOne({email : data.email} , {$set : {password : password}}).then((result) => {
                            resolve(result)
                        }).catch((err) => {
                            reject(err)
                        })
                    }).catch((err) =>{
                        reject(err)
                    })
                   
                }).catch((err) => {
                    reject('Incorrect password')
                })
              }
            } catch (err) {
                reject('Account not exist')
            }
        })
    }
}