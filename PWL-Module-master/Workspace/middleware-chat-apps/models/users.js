'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Messengers, { as: 'SentMessages', foreignKey: 'from_id' });
      Users.hasMany(models.Messengers, { as: 'ReceivedMessages', foreignKey: 'to_user_id' });
    }
  }

  Users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    nip: DataTypes.STRING,
    fullname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};