module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('recipients', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address_line_1: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address_line_2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address_line_3: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address_line_4: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state_provincy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('recipients');
  },
};
