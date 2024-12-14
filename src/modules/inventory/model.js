import mongoose from 'mongoose';

const { Schema } = mongoose;

const inventorySchema = new Schema({
  skuCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  skuName: {
    type: String,
    required: true,
    trim: true
  },
  material: {
    type: String,
    enum: ['wood', 'plastic', 'metal', 'composite', 'other'],
    required: true
  },
  size: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    default: 0,
    min: 0
  },
  unitPrice: {
    type: Number,
    default: 0,
    min: 0
  },
  location: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

inventorySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;
