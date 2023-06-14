const { doCheckout, doFindOrders } = require('../../helpers/userHelpers/useBilling');

  require('dotenv').config()
  const stripe = require('stripe')(process.env.STRIPE_KEY)

  exports.user_billing = async(req,res ) => {                    // user profile edit
    try {
       const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'INR',
              product_data: {
                name: 'Appointment booking',
              },
              unit_amount: req.body.userData.totalAmount + 0.00,
            },
            quantity : 1
          },
        ],
        mode: 'payment',
        success_url: `${process.env.ORIGIN_URL}/doctor-appointment-success`,
        cancel_url: `${process.env.ORIGIN_URL}/doctor-appointment-checkout`,
      });

      res.send({url : session.url , userData : req.body.userData});
        } catch (err) {
            res.status(401).json(err)
        }
}


exports.user_checkout = ( req , res ) => {
  try {
    doCheckout(req.body.userData).then((data) => {
      res.status(200).json(data)
    }).catch((err) => {
      res.status(401).json(err)
    })
  } catch (err) {
    console.log(err);
      res.status(401).json(err)
  }
}

exports.user_all_orders = (req , res) => {
  try {
    doFindOrders(req.body.userId).then((data) => {
      res.status(200).json(data)
    }).catch((err) => {
      res.status(401).json(err)
    })
  } catch (err) {
    res.status(401).json(err)
  }
}
