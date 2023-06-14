const doctor = require('../../helpers/doctorHelpers/doctorLogin')
const generateToken = require('../../middleware/generateToken')

exports.doctor_login = (req ,res ) => {
    try {
        doctor.doLogin(req.body).then(async(data) => {
            data.token = await generateToken(data._id)
            console.log(data);
            const doctor = {
                token : generateToken(data._id) ,
                doctorName : data.doctorName ,
                specialityId : data.specialityId ,
                speciality : data.speciality ,
                picture : data.picture ,
                gender : data.gender ,
                email : data.email ,
                phone : data.phone ,
                password : data.password ,
                timeSchedule : data.timeSchedule ,
                education : data.education ,
                review : data.reviews ,
                rating : data.rating ,
                aboutMe : data.aboutMe ,
                clinicDetails : data.clinicDetails ,
                consultingFee : data.consultingFee ,
                _id : data._id
            }
            res.status(200).json(doctor)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.doctor_data = ( req ,res ) => {
    try {
        doctor.doctorData(req.body.doctorId).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.profile_edit = (req , res) => {
    try {
        doctor.doProfileEdit(req.body , req.file?.path).then(() => {
            doctor.doctorData(req.body.doctorId).then((data) => {
                res.status(200).json(data)
            })
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        console.log("ERRRER");
        console.log(err);
        res.status(401).json(err)
    }
}

exports.change_password = (req , res) => {
    try {
        doctor.changePassword(req.body).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}