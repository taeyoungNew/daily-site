"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // user-post1대다관계
      this.hasMany(models.Post, {
        sourceKey: "id",
        foreignKey: "userId",
      });
      // user-userInfo 1대1관계
      this.hasOne(models.UserInfo, {
        sourceKey: "id",
        foreignKey: "userId",
      });
      // user-comment 1대다관계
      this.hasMany(models.Comment, {
        sourceKey: "id",
        foreignKey: "userId",
      });

      this.hasMany(models.PostLike);
      // user - like 다대다
      this.belongsToMany(models.Post, {
        through: "PostLike",
        foreignKey: "userId",
        as: "post",
        sourceKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      // user - folloing
      this.belongsToMany(models.User, {
        through: "Follow",
        targetKey: "id",
        foreignKey: "followingId",
        as: "followings",
      });

      // user - follower
      this.belongsToMany(models.User, {
        through: "Follow",
        targetKey: "id",
        foreignKey: "followerId",
        as: "followers",
      });

      // user - chat
      this.belongsToMany(models.User, {
        through: "Chat",
        targetKey: "id",
        foreignKey: "userOneId",
        as: "userOne",
      });

      this.belongsToMany(models.User, {
        through: "Chat",
        targetKey: "id",
        foreignKey: "userTwoId",
        as: "userTwo",
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      crrRefToken: {
        type: DataTypes.STRING,
      },
      crrRefTokenExp: {
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
