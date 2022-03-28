import express from 'express';
import themesModel from './themesModel.js';
import dotenv from 'dotenv';
dotenv.config();

const themeRouter = express.Router(); 

//ADD A NEW SITE
themeRouter.post("/", async (req, res) => {
    try{
	const theme = new themesModel({
		site_id: req.body.site_id,
        colours: req.body.colours,
        header: req.body.header
       
    })
	await theme.save()
	res.send(theme)
}
catch(e)
{
  res.status(400).json({error: {message: e.message}})

}
})

//update a theme
themeRouter.post("/:id", async (req, res) => {  
    const id = parseInt(req.params.id); 
   const response = await themesModel.findOneAndUpdate({site_id : id}, {$set: {'colours.primary': '#fe2343'}})
   
    res.send(response)
    })

themeRouter.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const response = await themesModel.find({site_id : id  })
    res.send(response[0])
}); 


export default themeRouter;