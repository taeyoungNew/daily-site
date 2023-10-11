'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserInfo.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    hobby: DataTypes.STRING,
    address: DataTypes.STRING,
    mbti: DataTypes.STRING,
    food: DataTypes.STRING,
    age: DataTypes.INTEGER,
    aboutMe: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserInfo',
  });
  return UserInfo;
};