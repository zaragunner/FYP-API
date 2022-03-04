import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import productsRouter from './api/products/routes.js'

dotenv.config();


mongoose.connect(process.env.mongoDB)
.then(()=> {
  const app = express();
  
const port = process.env.PORT;
app.use(express.json());
app.use('/api/products', productsRouter);

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