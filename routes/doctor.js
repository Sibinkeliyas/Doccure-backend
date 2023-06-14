var express = require('express');
var router = express.Router();
const doctorLogin = require('../controller/doctor/doctorLogin')     // doctor login controller// doctor login controller
const timeSchedule = require('../controller/doctor/timeSchedule')   // doctor time schedulling
const patients = require('../controller/doctor/patients');
const { protect } = require('../middleware/authMiddleWare');
const { find_all_reviews } = require('../controller/user/doctors');
const { reply_review } = require('../controller/doctor/review.');
const multer = require('multer')
const path = require('path');
const { profile_edit } = require('../controller/doctor/doctorLogin');
const { find_all_user_messages } = require('../controller/chat/doctor');

// multer setUp


// // const upload = multer({storage : storage});
// const upload = multer({storage : storage})

const storage = multer.diskStorage({
  destination : (req , file , cb) => {
      cb(null , 'upload')
  } ,
  filename : (req , file , cb) => {
    cb(null , Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage : storage ,
  limits : {
    fileSize : '10000000'
  } ,
  fileFilter : (req , file , cb) => {
    const fileTypes = /jpeg|jpg|png|gif/
    const mimType = fileTypes.test(file.mimetype)
    const extName = fileTypes.test(path.extname(file.originalname))
    if(mimType && extName) {
      return cb(null , true)
    } else {
      cb('Give proper file formate to upload')
    }
  }
}).single('image')

// login

router.route('/').post(doctorLogin.doctor_login)            // doctor login

router.route('/doctorData').post(protect , doctorLogin.doctor_data)   //docotr data


router.route('/total-patients-count').post(protect , patients.total_no_of_patients)                     // total no of patients

router.route('/total-acceptped-patients-count').post(protect ,patients.total_no_of_accepted_patients)  // total no of accepted patients

router.route('/total-no-appointments-count').post(protect ,patients.total_no_of_appointments)          // total no of appoitments



router.route('/total-appoitments').post(protect ,patients.total_patients_appoitments)                  //total appointments

router.route('/todays-appointment').post(protect ,patients.findTodaysPatients)                         //todays appoinment

router.route('/total-patients').post(protect ,patients.findAllPatients)                                 //total patients

router.route('/change-appointments-status').post(protect , patients.changeAppointmentStatus)



router.route('/find-all-review').post(protect ,find_all_reviews)                        //find all reviews

router.route('/reply-to-review').post(protect ,reply_review)                            //reply review



router.route('/doctor-profile-edit').post(protect , upload, profile_edit)                     //profile edit

router.route('/change-password').post(doctorLogin.change_password)                               //change password



router.route('/find-time-schedules').post(protect ,timeSchedule.find_time_schedule)

router.route('/time-schedule').post(protect ,timeSchedule.doctor_time_schedule)                  // time schedule 

router.route('/time-schedule-edit').post(protect ,timeSchedule.doctor_time_schedule_edit)        // time schedule 

router.route('/time-schedule-delete').post(protect ,timeSchedule.doctor_time_schedule_delete)    // time schedule 



router.route('/find-all-users-message').post(protect , find_all_user_messages)                //find all doctor message








module.exports = router;
