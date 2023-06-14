const userShema = require('../../model/user/userLoginSchema')

exports.find_all_patients = (req , res) => {
    try {
        userShema.find({name : {$regex : req.body.search , $options : 'i'}})
        .skip((req.body.page - 1) * req.body.perPage)
        .limit(req.body.perPage).then(async(data) => {
            let count = await userShema.find().count()
            res.status(200).json({data , count})
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}