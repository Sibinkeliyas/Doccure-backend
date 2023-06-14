const { doFindAllMessages, doFindAllDoctorMessages, doCreateMessage, doAddMessage, doIncreaseUserMessageCount, doDecreaseUserMessageCount } = require("../../helpers/doctorHelpers/chatHelper")

exports.find_all_user_messages = (req , res) => {
    try {
        doFindAllMessages(req.body).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            console.log(err);
            res.status(401).json(err)
        })
    } catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}

exports.find_all_doctor_messages = (req , res) => {
    try {
        doFindAllDoctorMessages(req.body).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.create_message = (req , res ) => {
    try {
        doCreateMessage(req.body).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
         res.status(401).json(err)
    }
}

exports.storeMessage = (req , res ) => {
    try {
        doAddMessage(req.body).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.increaseCount = (req , res ) => {
    try {
        doIncreaseUserMessageCount(req.body).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.decreaseCount = (req , res ) => {
    try {
        doDecreaseUserMessageCount(req.body).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}

