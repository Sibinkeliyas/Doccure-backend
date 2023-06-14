const { doFindAllAppointments,  doFindAllTransactions, doFindOrder } = require("../../helpers/adminHelpers/bookings")

exports.all_appointments = (req , res) => {
    try {
        doFindAllAppointments(req.body).then((data) => {
            res.status(200).json({data , count : data.length})
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.doFindAllTransactions = (req , res) => {
    try {
        doFindAllTransactions(req.body).then((data) => {
            console.log(data);
            res.status(200).json({data})
        }).catch((err) => {
            res.status(200).json({err})
        })
    } catch (err) {
        res.status(200).json({err})
    }
}

exports.doFindTransaction = (req , res) => {
    try {
        doFindOrder(req.query.id).then((data) => {
            console.log(data);
            res.status(200).json({data})
        }).catch((err) => {
            res.status(200).json({err})
        })
    } catch (err) {
        res.status(200).json({err})
    }
}