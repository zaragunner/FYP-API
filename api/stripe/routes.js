import express from 'express';
import Stripe from 'stripe'
import db from '../../index.js'
const stripe = Stripe('sk_test_51Kg7S5HCuEVETKoCwwJKzta5zaVqv2Yy80vFq3D9JoH8khN3RfdRkuICmjpVp64lcdsFdSmfhU1dNrUFqXp7iWsc00z1f43k2H');


const stripeRouter = express.Router(); 

stripeRouter.post('/create-payment-method', async (req, res) => {
  try{ 
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: req.body.card
});
console.log("created payment method")
res.send({status : 200, paymentMethod})
  }
  catch(e)
  {
    res.send({status:400, error: e.message })

  }
}
),

stripeRouter.post('/create-payment-intent', async (req, res) => {
  try {
  const paymentIntent = await stripe.paymentIntents.create({
     amount : req.body.amount,
     currency: 'eur',
     payment_method_types: ['card'],
     payment_method: req.body.payment_method.paymentMethod.id

   })
   console.log("Created payment intent")
   res.json({status:200,
     clientSecret : paymentIntent.client_secret,
              id : paymentIntent.id})
  
  }
  catch(e)
  {
    res.json({status: 400, error: {message: e.message}})

  }

  });


  
stripeRouter.post('/confirm-payment', async (req, res) => {
  try{
  const paymentIntent = await stripe.paymentIntents.confirm(
   req.body.payment_intent,
    {payment_method: req.body.payment_method.paymentMethod.id}
  );
  db.collection('confirmedPayments').insertOne({site_id : process.env.siteID , paymentIntent , order : req.body.order , customer: req.body.customer, status: 'Processing' }),
  res.json({status:200, paymentIntent})
  
  }
  catch(e)
  {
    res.json({status:400, error: {message: e.message}})

  } 

})

  

export default stripeRouter;



// This is your test secret API key.
