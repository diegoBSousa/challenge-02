module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('parcels', 'signature');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('parcels', 'signature', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
