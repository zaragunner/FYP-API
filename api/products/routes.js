
import express from 'express';
import productsModel from './productsModel.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router(); 
const siteID = process.env.siteID

router.get('/', async (req, res) => {
    const products = await productsModel.find({site_id : siteID})
    res.send(products)
});

router.get('/:id',  async (req, res) => {
    const id = parseInt(req.params.id)
    const product = await productsModel.findOne({site_id : siteID, product_id : id})
    res.send(product)
    console.log("Getting product")
}); 

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
   
    const response = await productsModel.deleteOne({site_id : siteID,product_id : id  })
    console.log("DElete porduct")
    res.send(response)
}); 

router.post("/", async (req, res) => {
	const products = new productsModel({
		product_id: req.body.product_id,
		site_id: req.body.site_id,
        name: req.body.name,
        description: req.body.description,
        category_id: req.body.category_id,
        sub_category_id: req.body.category_id,
        price : req.body.price,
        images : req.body.images,
        options : req.body.options
    })
	await products.save()
	res.send(products)
})


export default router;