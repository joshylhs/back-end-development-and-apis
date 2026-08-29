const notFoundHandler = (req, res, next) => {
    const error = new Error(`${req.originalUrl} not found!`)
    error.status = 404;
    next(error);
}

const finalErrorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    console.error(err);
    res.status(status).json({
        error:true,
        message: status === 500 ? 'Internal Server Error (Check Server Logs)': err.message
    });
}

export {notFoundHandler, finalErrorHandler};