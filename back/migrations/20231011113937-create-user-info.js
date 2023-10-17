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
        type: Sequelize.STRING(10),
      },
      hobby: {
        type: Sequelize.STRING(20),
      },
      address: {
        type: Sequelize.STRING(30),
      },
      mbti: {
        type: Sequelize.ENUM(
          "ISTJ",
          "ISFJ",
          "INFJ",
          "INTJ",
          "ISTP",
          "ISFP",
          "INFP",
          "INTP",
          "ESTP",
          "ESFP",
          "ENFP",
          "ENTP",
          "ESTJ",
          "ESFJ",
          "ENFJ",
          "ENTJ"
        ),
      },
      food: {
        type: Sequelize.STRING,
      },
      age: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      aboutMe: {
        type: Sequelize.STRING,
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
