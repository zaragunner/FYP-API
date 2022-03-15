import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SiteSchema = new Schema({
  site_id: { type: Number, required: true},
  name: {type: String, required: true},
  contact_no: {type: String , required: true },
  email : {type: String , required: true },
  status : {type: String },
  registration_date : {type : Date , required: true} ,
  expiry :  {type : Date , required: true},
  contact_us : {
      phone: {type: String , required: true },
      email : {type: String , required: true },
      postcode : {type: String , required: true },
  },
 managers: {type: Array, default : []}
  
});

export default mongoose.model('Site', SiteSchema);