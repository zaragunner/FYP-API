
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
    const queryID = parseInt(req.params.id)
    db.collection('confirmedPayments').find({_id : queryID}).toArray(function(err, result) {
        if (err) throw err;
       else{
      res.send(result)
       }
    })
    
});
       
     
    
    


export default ordersRouter;
