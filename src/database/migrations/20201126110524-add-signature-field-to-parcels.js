module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('parcels', 'signature_uuid', {
      type: Sequelize.UUID,
      references: {
        model: 'files',
        key: 'uuid',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('parcels', 'signature_uuid');
  },
};
