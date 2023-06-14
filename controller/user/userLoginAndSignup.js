// user helpers
const user_login = require('../../helpers/userHelpers/login')
const generateToken = require('../../middleware/generateToken')





exports.user_signIUp_post = (req,res , next) => {                    // user sign up
    try {
      user_login.doSignUp(req.body).then((data) => {
          res.status(200).send(data)
      }).catch((err) => {
        console.log(err);
        res.status(401).json(err)
      })
    } catch (err) {
      console.log(err);
        res.status(401).json(err)
    }
}

exports.user_login_post = async(req , res ) => {            // user login
     try {
      if(req.body.googleCodeResponce) {
       user_login.googleUserFind(req.body.googleCodeResponce).then(async(data) => {
        let details = {
          name : data.name ,
          lastName : data.lastName ,
          email : data.email ,
          phone : data.phone ,
          dob : data.dob ,
          bloodGroup : data.bloodGroup ,
          address : data.address ,
          city : data.city ,
          state : data.state ,
          zipCode : data.zipCode ,
          token : generateToken(req.body.googleCodeResponce.id) ,
          from : 'google' ,
          _id : data._id ,
          picture : data.picture
        }
        res.status(200).json(details)
       }).catch(() => {
          let details = {
            email : req.body.googleCodeResponce.email , 
            name : req.body.googleCodeResponce.name ,
            lastName : req.body.lastName ,
            _id : req.body.googleCodeResponce.id ,
            token : generateToken(req.body.googleCodeResponce.id) ,
            picture : req.body.googleCodeResponce.picture , 
            from : "google" ,
            dob : req.body.dob ,
            phone : req.body.phone ,
            bloodGroup : req.body.bloodGroup ,
            address : req.body.address ,
            city : req.body.city ,
            state : req.body.state ,
            zipCode : req.body.zipCode ,

          }
        res.status(200).json(details)
       })
      } else {
        user_login.doLogin(req.body).then((data) => {
          let details = {
              _id : data._id , 
              name : data.name , 
              lastName : data.lastName ,
              email : data.email,
              phone : data.phone ,
              token : generateToken(data._id) , 
              from : "local" ,
              bloodGroup : data.bloodGroup ,
              address : data.address ,
              city : data.city ,
              state : data.state ,
              zipCode : data.zipCode ,
              picture : data.picture , 
              dob : data.dob ,
          }
            res.status(200).json(details)
        }).catch((err) => {
            res.status(401).json(err)
        })
      }
     } catch (err) {
        res.status(401).json(err)
     }
} 
exports.User = (req , res) => {
  try {
    user_login.findUser(req.body.id).then((data) => {
      res.status(200).json(data)
    }).catch((err) => {
      res.status(401).json(err)
    })
  } catch (err) {
    res.status(401).json(err)
  }
}

