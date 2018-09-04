import mongoose from 'mongoose';
import uuid from 'uuid';

const Schema = mongoose.Schema;

const heroSchema = new Schema({
  id: { type: String, default: uuid.v1 },
  name: String,
  voteCount: { type: Number, default: 0 }
});

heroSchema.index({ '$**': 'text' });

const model = mongoose.model('hero', heroSchema);

export default model;
