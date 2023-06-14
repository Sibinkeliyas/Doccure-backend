const allOrders = require('../helpers/commonHelpers/allOrders')


exports.user_orders = (req , res ) => {
    try {
        allOrders.doFindOrders(req.body.userId , 
            req.body.appointmentStatus  , 
            req.body.page  , 
            req.body.perPage , 
            req.body.search
            ).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}