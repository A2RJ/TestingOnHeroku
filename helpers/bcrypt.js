const bcrypt = require("bcryptjs");

function hashPassword(password) {
    let salt = bcrypt.genSaltSync(8);
    let hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;
}

function comparePassword(password, db_password) {
    return bcrypt.compareSync(password, db_password);
}

module.exports = {
    hashPassword,
    comparePassword,
};
