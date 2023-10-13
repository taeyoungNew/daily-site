"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserInfos", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      profileImg: {
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      hobby: {
        type: Sequelize.STRING,
        defaultValue: "미등록",
      },
      address: {
        type: Sequelize.STRING,
        defaultValue: "미등록",
      },
      mbti: {
        type: Sequelize.STRING,
        defaultValue: "미등록",
      },
      food: {
        type: Sequelize.STRING,
        defaultValue: "미등록",
      },
      age: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      aboutMe: {
        type: Sequelize.STRING,
        defaultValue: "미등록",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserInfos");
  },
};
