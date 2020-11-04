module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('parcels', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      recipient_id: {
        type: Sequelize.UUID,
        references: {
          model: 'recipients',
          key: 'uuid',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      deliveryman_id: {
        type: Sequelize.UUID,
        references: {
          model: 'deliverymen',
          key: 'uuid',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      signature: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      canceled_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'Date that delivery has been Canceled',
      },
      incoming_date: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: 'Date that parcel has arrived to warehouse',
      },
      delivery_date: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'Date that parcel has been delivered',
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
    await queryInterface.dropTable('parcels');
  },
};
