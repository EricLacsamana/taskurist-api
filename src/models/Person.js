import mongoose from 'mongoose';

const { Schema } = mongoose;

const personSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    middleName: {
        type: String,
        required: false,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
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
