"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        queryInterface.addConstraint("Users", {
            fields: ["email"],
            type: "unique",
            name: "uniqueEmail",
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         */
        await queryInterface.removeConstraint("Users", "uniqueEmail");
    },
};
