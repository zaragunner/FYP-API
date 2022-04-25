
import express from 'express';
import productsModel from './productsModel.js';
import dotenv from 'dotenv';
dotenv.config();
import multer from 'multer'
import fs from 'fs'
// import path from 'path'

const fileStorageEngine = multer.diskStorage({
  destination : (req, file, cb)=>{
    cb(null, '/app/api/products/uploads' )
  },
  filename : (req, file, cb) =>{
    cb(null, file.originalname)
  }
})
const upload = multer({storage: fileStorageEngine});
const productsRouter = express.Router(); 

//GET ALL PRODUCTS
productsRouter.get('/', async (req, res) => {
    try{
    const products = await productsModel.find({site_id :req.query.site})
    res.send(products)
    }
    catch(e)
    {
      res.status(400).json({error: {message: e.message}})
  
    }
});

//GET PRODUCT BY ID
productsRouter.get('/:id',  async (req, res) => {
    try{
    const id = req.params.id
    const product = await productsModel.findOne({site_id : req.query.site, product_id : id})
    res.send(product)
    console.log("Getting product")
    }
    catch(e)
    {
      res.status(400).json({error: {message: e.message}})
  
    }
}); 

//DELETE A SINGLE PRODUCT
productsRouter.delete('/:id', async (req, res) => {
    try{
    const id = req.params.id;
    const response = await productsModel.deleteOne({product_id : id  })
    res.send(response)
    }
    catch(e)
    {
      res.status(400).json({error: {message: e.message}})
  
    }
}); 

productsRouter.put('/:id',upload.single('thumbnail'), async (req, res) => {
  try{
  const id = req.params.id;
  const filter = { product_id : id };

// `doc` is the document _before_ `update` was applied
  const response = await productsModel.findOneAndUpdate(filter,
    {"$set": { "name": req.body.name, 
              "description": req.body.description,
              "category_id": req.body.category_id,
              "sub_category_id": req.body.category_id,
              "netprice": req.body.netprice,
              "vat_id": req.body.vat_id,
              "images" : req.body.images,
              "options" : req.body.options}}, {
    new: true
  });
  res.status(200).json(response)
}
catch(e){
  console.log(e)
}
}); 

//ADD A NEW PRODUCT
productsRouter.post("/", upload.single('thumbnail'), async (req, res) => {
  console.log(req.body.options)
    try{
	const products = new productsModel({
		product_id: req.body.product_id,
		site_id: req.body.site_id,
        name: req.body.name,
        description: req.body.description,
        category_id: req.body.category_id,
        sub_category_id: req.body.category_id,
        netprice: req.body.netprice,
        vat_id: req.body.vat_id,
        thumbnail: {
          data: req.body.thumbnail,
          contentType: 'image/png',
          fileName: req.body.thumbnailName
        },
        images : req.body.images,
        options : req.body.options
    })
	await products.save()
	res.send(products)
}
catch(e)
{
  res.status(400).json({error: {message: e.message}})

}
})


export default productsRouter;