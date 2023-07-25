const messages = {
    success: {
        responseCode: 200,
        lang: {
            en: "operation was successful",
        }
    },
    validationError: {
        responseCode: 422,
        lang: {
            en: "invalid input",
        }
    },
    internalServerError: {
        responseCode: 500,
        lang: {
            en: "something went wrong. please try again later!",
        }
    },
    homeNotExist: {
        responseCode: 404,
        lang: {
            en: "Home name does not exist!",
        }
    },
}

exports.responseGenerator = (req, res, status = 'success', data = null, customMessage = null) => {
    let response = {};
    let message = (messages[status] !== undefined) ? messages[status] : messages.internalServerError;
    response.responseCode = message.responseCode;
    response.message = customMessage || message.lang[req.headers.language || 'en'];
    if (data)   response.data = data;
    return res.status(response.responseCode).json(response);
}
