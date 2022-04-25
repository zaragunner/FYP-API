
import express from 'express';
import categoryModel from './categoryModel.js';
import dotenv from 'dotenv';
dotenv.config();
const categoryRouter = express.Router(); 
const siteID = process.env.siteID

//ADD A NEW CAtegory
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


//GET ALL Categories
categoryRouter.get('/', async (req, res) => {
    try{
    const categories = await categoryModel.find({site_id : req.body.site_id})
    res.send(categories)
}
catch(e)
{
  res.status(400).json({error: {message: e.message}})

}
});

categoryRouter.put('/:id', async (req, res) => {
  try{
    console.log("updating category")
  const id = req.params.id;
  const filter = {category_id : id };
console.log(id, req.body.name, req.body.description)
// `doc` is the document _before_ `update` was applied
  const response = await categoryModel.findOneAndUpdate(filter,
    {"$set": { "name": req.body.name, "description" : req.body.description } } , {
      new: true
    });
    
    res.status(200).json(response)
  }
  catch(e){
    console.log(e)
  }
})



// //GET PRODUCT BY ID
// categoryRouter.get('/:id',  async (req, res) => {
//     const id = parseInt(req.params.id)
//     const product = await productsModel.findOne({site_id : siteID, product_id : id})
//     res.send(product)
//     console.log("Getting product")
// }); 


//DELETE A SINGLE Category
categoryRouter.delete('/:id', async (req, res) => {
    try{
    const id = req.params.id
    const response = await categoryModel.deleteOne({site_id : req.body.site_id, category_id : id  })
    res.send(response)
    }
    catch(e)
{
  res.status(400).json({error: {message: e.message}})

}
}); 







export default categoryRouter;