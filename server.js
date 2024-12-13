import dotenv from 'dotenv';
import http from 'http';
import app from './app.js';
import connectDB from './db.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

connectDB();

const shutdown = (signal) => {
    console.log(`Received ${signal}. Shutting down gracefully...`);

    server.close((err) => {
        if (err) {
            console.error('Error during server shutdown:', err);
            process.exit(1);
        }

        console.log('Server has been shut down gracefully.');
        process.exit(0);
    });

};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


export { server };
