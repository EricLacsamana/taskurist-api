import mongoose from 'mongoose';

const { Schema } = mongoose;

const jobOrderSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  jobType: {
    type: String,
    enum: ['repair', 'maintenance', 'production'],
    required: true
  },
  schedule: [
    {
      date: {
        type: Date,
        required: true
      },
      expectedQuantity: {
        type: Number,
        required: true,
        min: 1
      },
      actualQuantity: {
        type: Number,
        default: 0,
        min: 0
      }
    }
  ],
  workersAssigned: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
      required: true
    }
  ],
  assetsToRepair: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asset',
      required: true
    }
  ],
  inventorySku: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventory',
    required: false
  },
  repairDetails: {
    type: String,
    required: true,
    trim: true
  },
  jobStatus: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  totalQuantity: {
    type: Number,
    required: true,
    min: 1
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

jobOrderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const JobOrder = mongoose.model('JobOrder', jobOrderSchema);

export default JobOrder;
