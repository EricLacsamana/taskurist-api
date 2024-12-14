import mongoose from 'mongoose';

const { Schema } = mongoose;

const personSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    jobTitle: {
        type: String,
        required: true,
        trim: true,
    },
    assignedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobOrder',
        default: [],  // Set to an empty array if no jobs are assigned initially
    }],
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
}, {
    timestamps: true,  // Automatically handle createdAt and updatedAt
});


personSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});


const Person = mongoose.model('Person', personSchema);

export default Person;
