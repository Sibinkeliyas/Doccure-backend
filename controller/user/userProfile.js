  const userProfile = require('../../helpers/userHelpers/userProfile')
  
  exports.user_profile_edit = (req,res ) => {                    // user profile edit
    try {
        userProfile.doEditProfile(req.body.details).then((Data) => {
        res.status(200).json(Data)
      }).catch((err) => {
        res.status(401).json(err)
      })
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.user_password_edit = (req,res ) => {                  // user profile edit
  try {
      userProfile.doEditPassword(req.body).then((Data) => {
      res.status(200).json(Data)
    }).catch((err) => {
      res.status(401).json(err)
    })
  } catch (err) {
      res.status(401).json(err)
  }
}
