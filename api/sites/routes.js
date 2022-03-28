import express from 'express';
import sitesModel from './sitesModel.js';
import dotenv from 'dotenv';
dotenv.config();

const sitesRouter = express.Router(); 

//ADD A NEW SITE
sitesRouter.post("/", async (req, res) => {
    try{
	const site = new sitesModel({
		site_id: req.body.site_id,
        name: req.body.name,
        contact_no:  req.body.contact_no,
        email : req.body.email,
        status : req.body.status,
        registration_date : req.body.registration_date,
        expiry :  req.body.expiry,
        contact_us : req.body.contact_us,
        managers: req.body.managers
    })
	await site.save()
	res.send(site)
}
catch(e)
{
  res.status(400).json({error: {message: e.message}})

}
})

sitesRouter.get('/:id', async (req, res) => {
    try{
    const id = parseInt(req.params.id)
    const response = await sitesModel.find({site_id : id  })
    res.send(response[0])
    }
    catch(e)
    {
      res.status(400).json({error: {message: e.message}})
  
    }
}); 


export default sitesRouter;
