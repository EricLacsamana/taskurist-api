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
      ref: 'User',
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
  history: [
    {
      timestamp: {
        type: Date,
        default: Date.now
      },
      updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      changes: {
        type: String
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save validation for schedule and actualQuantity
jobOrderSchema.pre('save', function(next) {
  const dates = this.schedule.map(s => s.date.toISOString());
  const uniqueDates = new Set(dates);
  if (uniqueDates.size !== dates.length) {
    return next(new Error('Duplicate dates in schedule.'));
  }

  this.schedule.forEach(scheduleItem => {
    if (scheduleItem.actualQuantity > scheduleItem.expectedQuantity) {
      return next(new Error("Actual quantity cannot exceed expected quantity."));
    }
  });

  this.updatedAt = Date.now();
  next();
});

// Method to handle job status transitions
jobOrderSchema.methods.setStatus = function(newStatus, updatedBy) {
  const validTransitions = {
    'pending': ['in-progress'],
    'in-progress': ['completed'],
    'completed': []
  };

  if (!validTransitions[this.jobStatus].includes(newStatus)) {
    throw new Error(`Invalid status transition from ${this.jobStatus} to ${newStatus}`);
  }

  // Push status change to history
  this.history.push({
    updatedBy,
    changes: `Status changed from ${this.jobStatus} to ${newStatus}`
  });

  this.jobStatus = newStatus;
  this.updatedAt = Date.now();
};

// Preventing duplicate job orders with the same title and description
jobOrderSchema.pre('save', async function(next) {
  const existingJobOrder = await JobOrder.findOne({ title: this.title, description: this.description });
  if (existingJobOrder) {
    return next(new Error('Job order with this title and description already exists.'));
  }
  next();
});

const JobOrder = mongoose.model('JobOrder', jobOrderSchema);

export default JobOrder;
