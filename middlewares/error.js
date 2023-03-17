const errorHandler = (err, req, res, next) => {
    console.log(err.stack)

    res.status(error.statusCode || 500).json({
        success: false,
        error: err.message || 'Server Error'
    });
}

module.exports = errorHandler;