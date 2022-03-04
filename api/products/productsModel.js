import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  product_id: { type: Number, unique: true, required: true},
  site_id: { type: Number, required: true},
  name: {type: String, required: true},
  description: {type: String, required: true },
  category_id: { type: Number, required: true},
  sub_category_id: { type: Number, required: false},
  price : {
      netprice : {type: Number, required: true},
      vat_id : {type: Number , required:true},
      discount_price : { type: Number}
  },
  images :{
      thumbnail : { type:String , required: true},
      display_images : { type: Array,  default : []}
  },
  options : {type: Array, default : []}
});

export default mongoose.model('Product', ProductSchema);