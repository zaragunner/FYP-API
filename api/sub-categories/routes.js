
import express from 'express';
import subCategoryModel from './sub-categoryModel.js';
import dotenv from 'dotenv';
dotenv.config();

const subCategoryRouter = express.Router(); 


//GET ALL PRODUCTS
subCategoryRouter.get('/', async (req, res) => {
    const subCategories = await subCategoryModel.find({site_id : req.query.site})
    res.send(subCategories)
});



//DELETE A SINGLE PRODUCT
subCategoryRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const response = await subCategoryModel.deleteOne({ sub_category_id : id  })
    res.send(response)
}); 



//ADD A NEW PRODUCT
subCategoryRouter.post("/", async (req, res) => {
    try{
	const subCategory = new subCategoryModel({
		site_id: req.body.site_id,
        name: req.body.name,
        description: req.body.description,
        sub_category_id: req.body.sub_category_id,
        
    })
	await subCategory.save()
	res.send(subCategory)
}
catch(e)
{
  res.status(400).json({error: {message: e.message}})

}
});


  subCategoryRouter.put('/:id', async (req, res) => {
    try{
    
    const id = req.params.id;
    const filter = {sub_category_id : id };
  // `doc` is the document _before_ `update` was applied
    const response = await subCategoryModel.findOneAndUpdate(filter,
      {"$set": { "name": req.body.name, "description" : req.body.description } } , {
        new: true
      });
      res.status(200).json(response)
    }
    catch(e){
       
      console.log(e)
    }
  });


export default subCategoryRouter;