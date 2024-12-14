import mongoose from 'mongoose';

const { Schema } = mongoose;

const clientSchema = new Schema({
  name: { type: String, required: true },
  contactPerson: { type: String, default: '' },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Client = mongoose.model('Client', clientSchema);

export default Client;
