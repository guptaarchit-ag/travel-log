// add the not found middleware
// If a request ever made to here, that means we didn't find the route they were looking for
const notFound = (req,res,next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); 
};

// let us create an error handling middleware
// eslint-disable-next-line no-unused-vars
const errorHandler = (error,req,res,next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🎂' : error.stack,
    });
};

module.exports = {
    notFound, 
    errorHandler,
};