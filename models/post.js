'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {

    static associate(Model) {
      this.belongsTo(Model.User, { as: 'user' });
      this.hasMany(Model.like, { foreignKey: 'postId', as: "like" });
      this.hasMany(Model.Comment, { foreignKey: 'postId', as: "comment" });
    }
  };
  Post.init({
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    userId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};