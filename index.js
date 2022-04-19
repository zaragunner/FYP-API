import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import productsRouter from './api/products/routes.js'
import categoryRouter from './api/categories/routes.js';
import subCategoryRouter from './api/sub-categories/routes.js'
import vatRouter from './api/vat/routes.js'
import sitesRouter from './api/sites/routes.js'
import themeRouter from './api/themes/routes.js';
import stripeRouter from './api/stripe/routes.js'
import awsRouter from './api/aws/routes.js'
import ordersRouter from './api/orders/routes.js'
dotenv.config();


mongoose.connect(process.env.mongoDB)
.then(()=> {
  const app = express();
 
const port = process.env.PORT;
app.use(express.json());
app.use(express.static('./api/products/uploads'))
app.use('/api/products', productsRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/subcategories', subCategoryRouter);
app.use('/api/vat', vatRouter);
app.use('/api/sites' , sitesRouter);
app.use('/api/themes', themeRouter);
app.use('/api/stripe', stripeRouter);
app.use('/api/aws', awsRouter);
app.use('/api/orders' , ordersRouter)
app.listen(port, () => {
  console.info(`Server running at ${port}`);
});

})
// Connect to database

const db = mongoose.connection;

db.on('error', (err) => {
  console.log(`database connection error: ${err}`);
});
db.on('disconnected', () => {
  console.log('database disconnected');
});
db.once('open', () => {
  console.log(`database connected to ${db.name} on ${db.host}`);
})


export default db;
