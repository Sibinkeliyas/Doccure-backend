var express = require('express');
var router = express.Router();
const userSignUp = require('../controller/user/userLoginAndSignup') // user sign up and login
const doctors = require('../controller/user/doctors');               // user doctors
const user_profile = require('../controller/user/userProfile')
const { protect } = require('../middleware/authMiddleWare');
const { user_billing, user_checkout, user_all_orders } = require('../controller/user/userBilling');
const { user_orders } = require('../controller/common');
const chat = require('../controller/chat/chat');
const { find_all_doctor_messages, create_message, storeMessage, increaseCount, decreaseCount } = require('../controller/chat/doctor');



// login

router.route('/user_signUp').post(userSignUp.user_signIUp_post)             // user sign up 

router.route('/user_login').post(userSignUp.user_login_post)                // user login

router.route('/user').post(protect , userSignUp.User)                                 // user 

// find all doctors

router.route('/user_Find_doctors').post(doctors.user_find_doctors)                               // user find doctor

router.route('/user_add_favorite_doctors').post(protect ,doctors.user_add_favorites_doctors)    // user search doctor

router.route('/user_favorite_doctors').post(protect ,doctors.user_favorite_doctors)             // user profile doctor

router.route('/user_doctor_pagination').post(doctors.doctor_pagination)             // user profile doctor

// edit profile

router.route('/user_profile_edit').post(protect , user_profile.user_profile_edit)    //user profile edit         

router.route('/user_password_edit').post( protect , user_profile.user_password_edit)          //user password edit    



router.route('/user_add_review').post( protect , doctors.user_add_review)          //user add review  

router.route('/user_find_all_review').post( protect ,  doctors.find_all_reviews)          //user add review  



router.route('/create-checkout-session').post(protect , user_billing )          //user stripe  

router.route('/create-billing').post(protect , user_checkout )          //user stripe 

router.route('/user_all_orders').post(protect , user_orders )          //user stripe 



// chats

router.route('/find-all-doctor-message').post(protect , find_all_doctor_messages)           //find all user message

router.route('/create-message').post(protect , create_message)                              //create a message doc

router.route('/store-message').post(protect , storeMessage)                                //store  message 

router.route('/increase-message-count').post(protect , increaseCount)                       //increase  message count 

router.route('/decrease-message-count').post(protect , decreaseCount)                       //increase  message count 

router.post('/notification' , chat.notification)

router.post('/viewnotification' , chat.viewNotification)

router.post('/message' , chat.message)

router.get('/message', chat.getMessage)




module.exports = router;
