'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ClientePremios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cliente_cpf: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: 'Clientes'
          },
          key: 'cpf'
        }
      },
      premio_id: {
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: "Premios"
          },
          key: 'id'
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
    await queryInterface.dropTable('ClientePremios');
  }
};