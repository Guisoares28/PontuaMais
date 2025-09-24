'use strict';
const {
  Model
} = require('sequelize');
const cliente = require('./cliente');
module.exports = (sequelize, DataTypes) => {
  class Premio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Premio.belongsToMany(models.Cliente,{
        through: models.ClientePremio,
        foreignKey: 'premio_id',
        otherKey: 'cliente_cpf'
      });
    }
  }
  Premio.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    imagem: DataTypes.STRING,
    titulo: DataTypes.STRING,
    valor: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Premio',
  });
  return Premio;
};