import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
  site_id: { type: Number, required: true},
  sub_category_id: { type: String, required: true},
  name: {type: String, required: true},
  description: {type: String } 
  
});

export default mongoose.model('SubCategory', subCategorySchema);