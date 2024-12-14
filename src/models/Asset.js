import mongoose from 'mongoose';

const { Schema } = mongoose;

const assetSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['machine', 'vehicle', 'equipment', 'tool', 'other']
  },
  serialNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  purchaseDate: {
    type: Date,
    required: true
  },
  warrantyExpirationDate: {
    type: Date,
    required: false
  },
  currentCondition: {
    type: String,
    enum: ['new', 'good', 'fair', 'needs repair', 'out of order'],
    default: 'good'
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'under repair', 'decommissioned'],
    default: 'active'
  },
  lastServiceDate: {
    type: Date,
    required: false
  },
  nextServiceDue: {
    type: Date,
    required: false
  },
  maintenanceHistory: [
    {
      serviceDate: {
        type: Date,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      technician: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true
      }
    }
  ],
  jobOrders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobOrder',
      required: false
    }
  ],
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
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

assetSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Asset = mongoose.model('Asset', assetSchema);

export default Asset;
