'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transacao.belongsTo(models.Cliente,{
        foreignKey: 'cliente_cpf',
        targetKey: 'cpf'
      });
    }
  }
  Transacao.init({
    id:{
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    data: {
      type:DataTypes.DATE,
      defaultValue: Date.now()
    },
    valor: DataTypes.INTEGER,
    tipo: DataTypes.STRING,
    cliente_cpf:{
      type: DataTypes.STRING,
      references:{
        model: {
          tableName: 'Clientes',
        },
        key: 'cpf'
      }
    }
  }, {
    sequelize,
    modelName: 'Transacao',
  });
  return Transacao;
};