const passwordHashing = require('../commonHelpers/passwordHashing')  // password hashing
const adminLoginShema = require('../../model/admin/adminLoginSchema')


module.exports = {
    doSignUp : ({adminData}) => {
        return new Promise(async(resolve, reject) => {
            try {
                let admin = await adminLoginShema.findOne({email : adminData.email})
                if(!admin) {
                    passwordHashing.doBcrypt(adminData.password).then((data) => {
                        adminData.password = data
                        adminLoginShema.create(adminData).then((data) => {
                            resolve(data)
                        }).catch((e) => reject(e))
                    }).catch((err) => {
                        reject(err)
                    })
            } else {
                reject('admin already registered')
            }
            } catch (err) {
                reject(err)
            }
        })
    },
    dogLogin : ({adminData}) => {
        console.log(adminData);
        return new Promise(async(resolve, reject) => {
            try {
                let admin = await adminLoginShema.findOne({email : adminData.email})
                if(admin) {
                    passwordHashing.doBcryptCompare(adminData.password , admin.password).then(async(data) => {
                        resolve(admin)       
                    }).catch((err) => {
                        reject(err)
                    })
                } else {
                    reject("invalid admin")
                }
            } catch (err) {
                reject(err)
            }
        })
    } ,
    doFindAdimin : (adminId) => {
        return new Promise((resolve, reject) => {
            adminLoginShema.findOne({_id : adminId}).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}
