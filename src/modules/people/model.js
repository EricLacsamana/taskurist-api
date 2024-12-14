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
        default: [],
    }],
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
}, {
    timestamps: true,
});


personSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});


const Person = mongoose.model('Person', personSchema);

export default Person;
