import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb';
        console.log('DB', dbUri);
        await mongoose.connect(dbUri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

export default connectToDatabase;
