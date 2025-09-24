'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cliente.belongsToMany(models.Premio,{
        through: models.ClientePremio,
        foreignKey: 'cliente_cpf',
        otherKey: 'premio_id'
      });
      Cliente.hasMany(models.Transacao,{
        foreignKey: 'cliente_cpf',
      });
    }
  }
  Cliente.init({
    cpf: {
      type:DataTypes.STRING,
      primaryKey:true,
      unique:true
    },
    nome: DataTypes.STRING,
    telefone: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      unique:true
    },
    pontos: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};