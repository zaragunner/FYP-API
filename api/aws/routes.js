
import express from 'express';
import userPoolModel from './userPoolModel.js';
import dotenv from 'dotenv';
dotenv.config();

const awsRouter = express.Router(); 

//GET ALL PRODUCTS
awsRouter.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    
    try{
    const userPool = await userPoolModel.find({site_id : id})
    res.send(userPool)
    }
    catch(e)
{
  res.status(400).json({error: {message: e.message}})

}
});

awsRouter.post("/", async (req, res) => {
    try{
	const userPool = new userPoolModel({
		site_id: req.body.site_id,
        aws_cognito_region : req.body.aws_cognito_region,
    aws_user_pools_id: req.body.aws_user_pools_id,
    aws_user_pools_web_client_id: req.body.aws_user_pools_web_client_id
    })
	await userPool.save()
	res.send(userPool)
}
catch(e)
{
  res.status(400).json({error: {message: e.message}})

}
})

export default awsRouter;