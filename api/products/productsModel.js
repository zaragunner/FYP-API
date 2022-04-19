import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  product_id: { type: String, unique: true, required: true},
  site_id: { type: Number, required: true},
  name: {type: String, required: true},
  description: {type: String, required: true },
  category_id: { type: String, required: true},
  sub_category_id: { type: String, required: false},
      netprice : {type: Number, required: true},
      vat_id : {type: String , required:true},
    
  thumbnail : {
    data: Buffer,
    contentType: String,
    fileName : String
},
  images :{
        display_images : { type: Array,  default : []}
  },
  options : {type: Array, default : []}
});

export default mongoose.model('Product', ProductSchema);