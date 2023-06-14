const { doReplyReview } = require("../../helpers/doctorHelpers/review");
const { doFindAllReview } = require("../../helpers/userHelpers/userDoctorHelper");

exports.reply_review = (req , res) => {
    try {
        console.log(req.body);
        doReplyReview(req.body).then(() => {
            doFindAllReview(req.body.doctorId).then((data) => {
                res.status(200).json(data)
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