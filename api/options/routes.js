import express from 'express';
import optionModel from './optionsModel.js';
import dotenv from 'dotenv';
dotenv.config();

const optionsRouter = express.Router(); 
const siteID = process.env.siteID
//ADD A NEW CAtegory
optionsRouter.post("/", async (req, res) => {
  try{
const option = new optionModel({
      site_id: req.body.site_id,
      name: req.body.name,
      option_id: req.body.option_id, 
  })
await option.save()
res.send(option)
}
catch(e)
{
res.status(400).json({error: {message: e.message}})
}
})

optionsRouter.get('/:id',  async (req, res) => {
    const id = req.params.id
    const option = await optionModel.findOne({option_id : id})
    res.send(option)

}); 


//GET ALL Categories
optionsRouter.get('/', async (req, res) => {
    try{
    const options = await optionModel.find({site_id : siteID})
    res.send(options)
}
catch(e)
{
  res.status(400).json({error: {message: e.message}})

}
});

export default optionsRouter;