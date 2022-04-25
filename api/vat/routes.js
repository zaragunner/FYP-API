
import express from 'express';
import vatModel from './vatModel.js';
import dotenv from 'dotenv';
dotenv.config();

const vatRouter = express.Router(); 


//GET ALL PRODUCTS
vatRouter.get('/', async (req, res) => {
    const vatCategories = await vatModel.find({site_id : req.query.site})
    res.send(vatCategories)
});

//ADD A NEW PRODUCT
vatRouter.post("/", async (req, res) => {
    try{
	const vatCategory = new vatModel({        
		site_id: req.body.site_id,
        name: req.body.name,
        rate: req.body.rate,
        vat_id: req.body.vat_id,
        
    })
	await vatCategory.save()
	res.send(vatCategory)
}
catch(e)
{
  res.status(400).json({error: {message: e.message}})

}
})

vatRouter.put('/:id', async (req, res) => {
    try{
      console.log("updating vat Rate")
    const id = req.params.id;
    const filter = {vat_id : id };
  console.log(id, req.body.name, req.body.rate)
  // `doc` is the document _before_ `update` was applied
    const response = await vatModel.findOneAndUpdate(filter,
      {"$set": { "name": req.body.name, "rate" : req.body.rate } } , {
        new: true
      });
      
      res.status(200).json(response)
    }
    catch(e){
      console.log(e)
    }
  })


export default vatRouter;