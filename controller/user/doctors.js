const doctors = require('../../helpers/adminHelpers/adminDoctorsHelper')
const doctor = require('../../helpers/userHelpers/userDoctorHelper')

exports.user_find_doctors = (req , res ) => {
    try {
        doctors.doAllDoctors(req.body.gender , req.body.speciality , req.body.page , req.body.perPage).then((data) => {
            res.status(200).json({ data })
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}


exports.user_add_favorites_doctors = (req , res) => {
    try {
        doctor.doAddToFavorites(req.body).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.user_favorite_doctors = ( req , res ) => {
    try {
        doctor.doFavoriteDoctors(req.body).then((Data) => {
            res.status(200).json(Data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.user_add_review = (req , res) => {
    try {
        doctor.doAddReview(req.body).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.find_all_reviews = ( req , res ) => {
    try {
        doctor.doFindAllReview(req.body.doctorId).then((data) => {
             res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.doctor_pagination = (req , res ) => {
    try {
        doctor.dopagination(req.body).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}

