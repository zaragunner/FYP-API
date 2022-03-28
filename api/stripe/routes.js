import express from 'express';
import Stripe from 'stripe'
const stripe = Stripe('sk_test_51Kg7S5HCuEVETKoCwwJKzta5zaVqv2Yy80vFq3D9JoH8khN3RfdRkuICmjpVp64lcdsFdSmfhU1dNrUFqXp7iWsc00z1f43k2H');


const stripeRouter = express.Router(); 

stripeRouter.post('/create-payment-method', async (req, res) => {
  try{ 
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: req.body.card
});
console.log("created payment method")
res.json({paymentMethod})
  }
  catch(e)
  {
    res.status(400).json({error: {message: e.message}})

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
   res.json({clientSecret : paymentIntent.client_secret,
              id : paymentIntent.id})
  
  }
  catch(e)
  {
    res.status(400).json({error: {message: e.message}})

  }

  });


  
stripeRouter.post('/confirm-payment', async (req, res) => {
  try{
  const paymentIntent = await stripe.paymentIntents.confirm(
   req.body.payment_intent,
    {payment_method: req.body.payment_method.paymentMethod.id}
  );
  res.json({paymentIntent})
  
  }
  catch(e)
  {
    res.status(400).json({error: {message: e.message}})

  } 

})

  

export default stripeRouter;



// This is your test secret API key.
