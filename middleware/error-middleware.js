
export const errorHandler = (err, req, res) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        // success: false,
        statusCode,
        message: err.message || 'Internal Server Error',
    });
};
