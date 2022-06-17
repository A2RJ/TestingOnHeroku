"use strict";

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
        const data = require("../data/product.json").map((elem) => {
            elem.createdAt = new Date();
            elem.updatedAt = new Date();
            return elem;
        });
        await queryInterface.bulkInsert(
            "Products",

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
        await queryInterface.bulkDelete("Products", null, {});
    },
};
