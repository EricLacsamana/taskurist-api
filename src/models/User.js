import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    // username: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     trim: true,
    // },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'],
        default: 'user',
    },
    personalInformation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: false,
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
