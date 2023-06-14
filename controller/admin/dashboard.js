const { doFindCound, doFindBookingGraph } = require("../../helpers/adminHelpers/dashboard")

exports.dashboard = (req , res) => {
    try {
        doFindCound().then((count) => {
            doFindBookingGraph().then((data) => {
                res.status(200).json({count , data})
            }).catch((err) => {
                console.log(err);
                res.status(401).json(err)
            })
        }).catch((err) => {
            console.log(err);
                res.status(401).json(err)
            })
    } catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}