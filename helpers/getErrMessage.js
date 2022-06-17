function getErrMessage(err) {
    let error = "";

    if (
        err.name === "SequelizeUniqueConstraintError" ||
        err.name === "SequelizeValidationError"
    ) {
        error = err.errors.map((elem) => {
            return elem.message;
        });
    }
    return error;
}

module.exports = getErrMessage;
