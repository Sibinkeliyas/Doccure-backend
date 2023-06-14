const patients = require('../../model/user/userLoginSchema')
const transactions = require('../../model/user/bookings')

module.exports = {
    doFindAllPatients : ({perPage , page}) => {
        return new Promise(async(resolve, reject) => {
            let count = await patients.find().count()
            patients.find().skip((perPage) * (page - 1)).limit(perPage).then((data) => {
                resolve({data , count})
        }).catch((err) => {
            reject(err)
        })
        })
    } ,
    doFindAllTransactions : ({perPage , page}) => {
        return new Promise(async(resolve, reject) => {
            let count = await transactions.find().count()
            transactions.
            aggregate([
                
            ])
            .then((data) => {
                resolve({data , count})
            }).catch((err) => {
                reject(err)
            })
        })
    }
}