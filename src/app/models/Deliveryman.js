import Sequelize, { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

class Deliveryman extends Model {
  static init(sequelize) {
    super.init(
      {
        uuid: {
          type: Sequelize.UUID,
          primaryKey: true,
        },
        avatar_uuid: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'files',
            key: 'uuid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      { sequelize, tableName: 'deliverymen' }
    );

    this.addHook('beforeCreate', async (deliveryman) => {
      deliveryman.uuid = uuidv4();
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_uuid', as: 'avatar' });

    this.hasMany(models.Parcel, {
      foreignKey: 'deliveryman_uuid',
      as: 'parcels',
    });
  }
}

export default Deliveryman;
