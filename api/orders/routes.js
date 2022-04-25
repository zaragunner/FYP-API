
import express from 'express';
import dotenv from 'dotenv';
import db from '../../index.js'
dotenv.config();

const ordersRouter = express.Router(); 
const siteID = process.env.siteID

//GET ALL PRODUCTS
ordersRouter.get('/',  (req, res) => {
    db.collection('confirmedPayments').find({site_id : siteID}).toArray(function(err, result) {
        if (err) throw err;
       else{
      res.send(result)
       }
    })
    
});

ordersRouter.get('/:id',  (req, res) => {
    const queryID = req.params.id
    db.collection('confirmedPayments').find({order_id : queryID}).toArray(function(err, results){
        if (err) throw err;
       else{
      res.send(results)
       }
    });
    
});

ordersRouter.get('/user/:id',  (req, res) => {
    const userID = req.params.id
    console.log(userID)
    
    db.collection('confirmedPayments').find({"customer.user_id" : userID}).toArray(function(err, results){
        if (err) throw err;
       else{
      res.send(results)
       }
    });
    
});
     
ordersRouter.put('/:id', async (req, res) => {
    try{
    const id = req.params.id;
    const filter = { order_id : id };
  console.log(id)
  // `doc` is the document _before_ `update` was applied
    const response =  db.collection('confirmedPayments').findOneAndUpdate(filter,
      {"$set": { "customer.name": req.body.name, 
                 "customer.address" : req.body.address,
                 "customer.phone" : req.body.phone,
                 "customer.email" : req.body.email,
                 "status" : req.body.status,
                 "notes" : req.body.notes
                }}, {
      new: true
    });
    res.status(200).json(response)
  }
  catch(e){
    console.log(e)
  }
  }); 
     
    
    


export default ordersRouter;
