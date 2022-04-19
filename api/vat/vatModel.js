import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const VatSchema = new Schema({
  site_id: { type: Number, required: true},
  vat_id: { type: String, required: true},
  name: {type: String, required: true},
  rate:{type: Number, required: true}
  
});

export default mongoose.model('Vat', VatSchema);