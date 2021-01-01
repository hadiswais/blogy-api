'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profileImage extends Model {

    static associate(models) {
    }
  };
  profileImage.init({
    userId: DataTypes.INTEGER,
    url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'profileImage',
  });
  return profileImage;
};