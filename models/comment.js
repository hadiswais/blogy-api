'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {

    static associate(models) {


    };
  }

  Comment.init({
    comment: DataTypes.STRING,
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Comment',
  });

  return Comment;
};