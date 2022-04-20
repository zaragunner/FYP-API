import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OptionSchema = new Schema({
  site_id: { type: Number, required: true},
  option_id: { type: String, required: true},
  name: {type: String, required: true},
});

export default mongoose.model('Option', OptionSchema);
