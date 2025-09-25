'use strict';

const { DataTypes, DATE } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transacaos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      data: {
        type: Sequelize.DATE,
        defaultValue: Date.now()
      },
      valor: {
        type: Sequelize.INTEGER,
      },
      tipo: {
        type: Sequelize.STRING
      },
      cliente_cpf:{
        type: DataTypes.STRING,
        references:{
          model: {
            tableName: 'Clientes'
          },
          key: 'cpf'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transacaos');
  }
};