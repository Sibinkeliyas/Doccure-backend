const userSchema = require('../../model/user/userLoginSchema')
const { TodaysDate } = require('../commonHelpers/date')
const passwordHashing = require('../commonHelpers/passwordHashing')

module.exports = {
    doSignUp : (userData) => {
      return new Promise(async(resolve, reject) => {
        try {
          let user = await userSchema.findOne({email : userData.email})
          if(!user) {
            passwordHashing.doBcrypt(userData.password).then((data) => {
              userData.password = data
              userData.wallet = 0,
              userData.status = true
              userData.joinDate = new Date()
                userSchema.create(
                  userData
                ).then((data) => {
                  resolve(data)
                }).catch((e) => {
                  console.log(e);
                  reject(e)
                })
            })
        } else {
          reject('user already registered')
        }
        } catch (err) {
          reject(err)
        }
      })
    } ,

    doLogin : (userData) => {
      return new Promise(async(resolve, reject) => {
        try {
          let user = await userSchema.findOne({email : userData.email})
          if(user !== null) {
              passwordHashing.doBcryptCompare(userData.password , user.password).then((data) => { 
                if(user.status) {
                  userSchema.updateOne({_id : user._id} , {$set : {lastVist : TodaysDate(new Date())}}).then((data) => {
                      resolve(user)
                    }).catch((err) => {
                      reject(err)
                    })
                } else {
                  reject('You were blocked by the admin')
                }
              }).catch((err) => {
                reject(err)
              })
          } else {
              reject("Invalid user")
          }
        } catch (err) {
          reject(err)
        }
      })
    } ,
     googleUserFind : (data) => {
      return new Promise(async(resolve, reject) => {
        let user = await userSchema.findOne({email : data.email})
        if(user) {
          userSchema.updateOne({_id : user._id} , {$set : {lastVist : TodaysDate(new Date())}}).then((data) => {
            resolve(user)
          }).catch((err) => {
            reject(err)
          })
        } else {
          reject("no user")
        }
      })
     } ,
     findUser : (id) => {
     return new Promise((resolve, reject) => {
       userSchema.findOne({_id : id}).then((data) => {
          resolve(data)
      }).catch((err) => {
        reject(err)
      })
     })
     }
}