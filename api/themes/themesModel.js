import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ThemeSchema = new Schema({
  site_id: { type: Number, required: true},
  colours : {
     primary: {type: String , required: true },
      secondary : {type: String , required: true },
      tertiary : {type: String },
  },
  header : {
    logo: {type: String , required: true },
    font : {type: String },
    font_weight : {type: String },
 },
  
});

export default mongoose.model('Theme', ThemeSchema);