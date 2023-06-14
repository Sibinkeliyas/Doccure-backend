var express = require('express');
var router = express.Router();
const adminLogin = require('../controller/admin/adminLogin')          // admin login controller
const adminSpeciality = require('../controller/admin/speciality')     // admin speciality controller
const doctors = require('../controller/admin/doctors');                // admin doctors
const { all_appointments, doFindAllTransactions, doFindTransaction } = require('../controller/admin/bookings');
const { adminBlockUser, adminBlockDoctor } = require('../controller/admin/adminBlock');
const { find_all_patients } = require('../controller/admin/patients');
const { protect } = require('../middleware/authMiddleWare');
const { dashboard } = require('../controller/admin/dashboard');



// login

router.route('/').post(adminLogin.admin_register_post)                //  admin register page.

router.route('/admin-login').post(adminLogin.admin_login_post)        //  admin login page.

router.route('/admin').post(adminLogin.admin_find)        //  admin 

// block

router.route('/admin-block-user').patch(protect ,adminBlockUser)

router.route('/admin-block-doctor').patch(protect ,adminBlockDoctor)

// speciality

router.route('/admin-add-speciality').post(protect ,adminSpeciality.admin_add_speciality)          //  admin add speciality page.

router.route('/admin-speciality').get(adminSpeciality.admin_speciality)                  //  admin add speciality page.

router.route('/admin-all-speciality').post(adminSpeciality.admin_all_speciality)                  //  admin add speciality page.

router.route('/admin-Find-speciality').get(protect ,adminSpeciality.admin_find_speciality)        //  admin update speciality page.

router.route('/admin-update-speciality').post(protect ,adminSpeciality.admin_update_speciality)    //  admin update speciality page.

router.route('/admin-delete-speciality').post(adminSpeciality.admin_delete_speciality)    //  admin delete speciality page.

// doctor

router.route('/admin-add-doctors').post(protect ,doctors.admin_add_doctors)                 //  admin add  page.

router.route('/admin-find-doctors').post(doctors.admin_doctors)                     //  admin find doctors  page.

router.route('/admin-delete-doctors').post(protect ,doctors.admin_delete_doctors)            //  admin find doctors  page.

// appointments

router.route('/all-appointments').post(protect ,all_appointments)

router.route('/find-report').post(protect , doFindAllTransactions)

router.route('/find-appointment').get(protect , doFindTransaction)

// find users

router.route('/find-all-users').post(protect , find_all_patients)

// dashboard

router.route('/admin-dashboard').post(protect , dashboard)    //  admin dashboard


module.exports = router;
