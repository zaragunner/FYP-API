import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userPoolSchema = new Schema({
  site_id: { type: Number, required: true},
  aws_cognito_region:{ type: String, required: true},
    aws_user_pools_id: { type: String, required: true},
    aws_user_pools_web_client_id:{ type: String, required: true}
  });

export default mongoose.model('UserPool', userPoolSchema);