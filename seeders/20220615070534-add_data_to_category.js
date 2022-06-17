"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         */

        const data = require("../data/Category.json").map((elem) => {
            elem.createdAt = new Date();
            elem.updatedAt = new Date();
            return elem;
        });
        await queryInterface.bulkInsert(
            "Categories",

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
        await queryInterface.bulkDelete("Categories", null, {});
    },
};
