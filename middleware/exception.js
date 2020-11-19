export const exceptionMiddleware = (err, req, res, next) => {
    const { statusCode, message } = err;
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message
    });

    next()
}

