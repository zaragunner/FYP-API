
import express from 'express';
import vatModel from './vatModel.js';
import dotenv from 'dotenv';
dotenv.config();

const vatRouter = express.Router(); 
const siteID = process.env.siteID

//GET ALL PRODUCTS
vatRouter.get('/', async (req, res) => {
    const vatCategories = await vatModel.find({site_id : siteID})
    res.send(vatCategories)
});

// //GET PRODUCT BY ID
// vatRouter.get('/:id',  async (req, res) => {
//     const id = parseInt(req.params.id)
//     const product = await productsModel.findOne({site_id : siteID, product_id : id})
//     res.send(product)
//     console.log("Getting product")
// }); 

// //DELETE A SINGLE PRODUCT
// vatRouter.delete('/:id', async (req, res) => {
//     const id = parseInt(req.params.id)
//     const response = await productsModel.deleteOne({site_id : siteID,product_id : id  })
//     res.send(response)
// }); 

// //DELETE A SINGLE PRODUCT
// vatRouter.delete('/:id', async (req, res) => {
//     const id = parseInt(req.params.id)
//     const response = await productsModel.deleteOne({site_id : siteID,product_id : id  })
//     res.send(response)
// }); 

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


export default vatRouter;