"use strict";
const bcrypt = require("bcryptjs");
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        const data = require("../data/Users.json").map((elem) => {
            elem.createdAt = new Date();
            elem.updatedAt = new Date();
            const salt = bcrypt.genSaltSync(8);
            elem.password = bcrypt.hashSync(elem.password, salt);
            return elem;
        });
        await queryInterface.bulkInsert(
            "Users",

            data,
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         */
        await queryInterface.bulkDelete("Users", null, {});
    },
};
