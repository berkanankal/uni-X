const CustomError = require("../../helpers/error/CustomError");

const customErrorHandler = (err, req, res, next) => {
  let customErr = err;

  if (err.code === 11000) {
    customErr = new CustomError(
      "Duplicate Key Error: Please Check Your Info",
      400
    );
  }
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    customErr = new CustomError(messages, 400);
  }

  return res.status(customErr.statusCode || 500).json({
    success: false,
    message: customErr.message || "Internal Server Error",
  });
};

module.exports = customErrorHandler;
