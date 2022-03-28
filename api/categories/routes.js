
import express from 'express';
import categoryModel from './categoryModel.js';
import dotenv from 'dotenv';
dotenv.config();

const categoryRouter = express.Router(); 
const siteID = process.env.siteID

//GET ALL PRODUCTS
categoryRouter.get('/', async (req, res) => {
    const categories = await categoryModel.find({site_id : siteID})
    res.send(categories)
});

// //GET PRODUCT BY ID
// categoryRouter.get('/:id',  async (req, res) => {
//     const id = parseInt(req.params.id)
//     const product = await productsModel.findOne({site_id : siteID, product_id : id})
//     res.send(product)
//     console.log("Getting product")
// }); 

// //DELETE A SINGLE PRODUCT
// categoryRouter.delete('/:id', async (req, res) => {
//     const id = parseInt(req.params.id)
//     const response = await productsModel.deleteOne({site_id : siteID,product_id : id  })
//     res.send(response)
// }); 

//DELETE A SINGLE PRODUCT
categoryRouter.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const response = await categoryModel.deleteOne({site_id : siteID, category_id : id  })
    res.send(response)
}); 


//ADD A NEW PRODUCT
categoryRouter.post("/", async (req, res) => {
    try{
	const category = new categoryModel({
		site_id: req.body.site_id,
        name: req.body.name,
        description: req.body.description,
        category_id: req.body.category_id,
        
    })
	await category.save()
	res.send(category)
}
catch(e)
{
  res.status(400).json({error: {message: e.message}})

}
})


export default categoryRouter;