import mongoose from 'mongoose';

const { Schema } = mongoose;

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    contactPerson: {
      type: String,
      default: '',
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          return emailRegex.test(v);
        },
        message: 'Invalid email format',
      },
    },
    phone: {
      type: String,
      default: '',
      trim: true,
    },
    address: {
      type: String,
      default: '',
    },
    assets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset', 
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Pre-save timestamp update
clientSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the Client model
const Client = mongoose.model('Client', clientSchema);

export default Client;
