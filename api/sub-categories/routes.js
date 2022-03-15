
import express from 'express';
import subCategoryModel from './sub-categoryModel.js';
import dotenv from 'dotenv';
dotenv.config();

const subCategoryRouter = express.Router(); 
const siteID = process.env.siteID

//GET ALL PRODUCTS
subCategoryRouter.get('/', async (req, res) => {
    const subCategories = await subCategoryModel.find({site_id : siteID})
    res.send(subCategories)
});

// //GET PRODUCT BY ID
// subCategoryRouter.get('/:id',  async (req, res) => {
//     const id = parseInt(req.params.id)
//     const product = await productsModel.findOne({site_id : siteID, product_id : id})
//     res.send(product)
//     console.log("Getting product")
// }); 

//DELETE A SINGLE PRODUCT
subCategoryRouter.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const response = await subCategoryModel.deleteOne({site_id : siteID, sub_category_id : id  })
    res.send(response)
}); 

// //DELETE A SINGLE PRODUCT
// subCategoryRouter.delete('/:id', async (req, res) => {
//     const id = parseInt(req.params.id)
//     const response = await productsModel.deleteOne({site_id : siteID,product_id : id  })
//     res.send(response)
// }); 

//ADD A NEW PRODUCT
subCategoryRouter.post("/", async (req, res) => {
	const subCategory = new subCategoryModel({
		site_id: req.body.site_id,
        name: req.body.name,
        description: req.body.description,
        sub_category_id: req.body.sub_category_id,
        
    })
	await subCategory.save()
	res.send(subCategory)
})


export default subCategoryRouter;