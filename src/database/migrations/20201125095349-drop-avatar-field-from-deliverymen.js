module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('deliverymen', 'avatar');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('deliverymen', 'avatar', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
