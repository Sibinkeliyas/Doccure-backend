const bcrypt = require('bcrypt')


module.exports = {
    doBcrypt : ((password) => {
       return new Promise((resolve, reject) => {
                try {
                    bcrypt.hash(password , 10 , (err , password) => {
                        resolve(password)
                    })
                } catch (err) {
                    reject(err)
                }
        })
    }),
    doBcryptCompare : ((password , dbPassword) => {
        return new Promise((resolve, reject) => {
            try {
                bcrypt.compare( password , dbPassword ,(err , result) => {
                    if(err) {
                        reject(err)
                    } else if (result === true){
                        resolve(result)
                    } else {
                        reject("Incorrect password")
                    }
                })
            } catch (err) {
                reject(err)
            }
        })
    })
}