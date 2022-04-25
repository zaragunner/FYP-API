import express from 'express';
import optionModel from './optionsModel.js';
import dotenv from 'dotenv';
dotenv.config();

const optionsRouter = express.Router(); 

//ADD A NEW option
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


//GET ALL options
optionsRouter.get('/', async (req, res) => {
    try{
    const options = await optionModel.find({site_id : req.query.site})
    res.send(options)
}
catch(e)
{
  res.status(400).json({error: {message: e.message}})

}
});

optionsRouter.put('/:id', async (req, res) => {
  try{
    console.log("updating options")
  const id = req.params.id;
  const filter = {option_id : id };
console.log(id, req.body.name, req.body.description)
// `doc` is the document _before_ `update` was applied
  const response = await optionModel.findOneAndUpdate(filter,
    {"$set": { "name": req.body.name } } , {
      new: true
    });
    
    res.status(200).json(response)
  }
  catch(e){
    console.log(e)
  }
})

optionsRouter.delete('/:id', async (req, res) => {
  try{
  const id = req.params.id
  const response = await optionModel.deleteOne({option_id : id  })
  res.send(response)
  }
  catch(e)
{
res.status(400).json({error: {message: e.message}})

}
}); 

export default optionsRouter;