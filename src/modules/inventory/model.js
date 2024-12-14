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
    default: 0, // The quantity of the SKU in stock
    min: 0 // Prevent negative quantities
  },
  unitPrice: {
    type: Number,
    default: 0,
    min: 0 // Price per unit, could be zero for parts not for sale
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

// Automatically update the 'updatedAt' field when a document is modified
inventorySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create the Inventory model
const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;
