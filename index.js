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
import optionsRouter from './api/options/routes.js'
dotenv.config();

import cors from 'cors'




mongoose.connect(process.env.mongoDB)
.then(()=> {
  const app = express();
  app.use(cors({
    origin: 'https://fyp-client-44.herokuapp.com/'
}));

app.use((req, res, next) => {
  const allowedOrigins = ['https://fyp-client-44.herokuapp.com/'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});
app.options('*', cors())
const port = process.env.PORT;
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Fourth Year Project Express API')
})
app.use(express.static('./api/products/uploads'))
app.use('/api/products', productsRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/subcategories', subCategoryRouter);
app.use('/api/vat', vatRouter);
app.use('/api/sites' , sitesRouter);
app.use('/api/themes', themeRouter);
app.use('/api/stripe', stripeRouter);
app.use('/api/aws', awsRouter);
app.use('/api/orders' , ordersRouter);
app.use('/api/options', optionsRouter);
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
