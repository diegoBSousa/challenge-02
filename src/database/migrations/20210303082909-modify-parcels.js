module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('parcels', 'recipient_id', {
          transaction: t,
        }),
        queryInterface.removeColumn('parcels', 'deliveryman_id', {
          transaction: t,
        }),
        queryInterface.addColumn(
          'parcels',
          'recipient_uuid',
          {
            type: Sequelize.UUID,
            references: {
              model: 'recipients',
              key: 'uuid',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: false,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'parcels',
          'deliveryman_uuid',
          {
            type: Sequelize.UUID,
            references: {
              model: 'deliverymen',
              key: 'uuid',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: true,
          },
          { transaction: t }
        ),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('parcels', 'recipient_uuid', {
          transaction: t,
        }),
        queryInterface.removeColumn('parcels', 'deliveryman_uuid', {
          transaction: t,
        }),
        queryInterface.addColumn(
          'parcels',
          'recipient_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'recipients',
              key: 'uuid',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: false,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'parcels',
          'deliveryman_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'deliverymen',
              key: 'uuid',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: true,
          },
          { transaction: t }
        ),
      ]);
    });
  },
};
