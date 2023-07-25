const {responseGenerator} = require("../utilities/response");

const errorHandler = async (error, req, res, next) => {
    let message;
    if (error.error) {
        if (error.error.isJoi) {
            message = "Joi error: " +
                error.error.toString().replace(/"/gi,'').replace('ValidationError:','').trim();
        } else {
            message = error.error;
        }
    } else {
        message = error.message;
    }
    responseGenerator(req, res, 'internalServerError');
    next();
};
module.exports = errorHandler;
