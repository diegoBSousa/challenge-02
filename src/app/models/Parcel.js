import Sequelize, { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { getHours } from 'date-fns';

class Parcel extends Model {
  static init(sequelize) {
    super.init(
      {
        uuid: {
          type: Sequelize.UUID,
          primaryKey: true,
        },
        recipient_uuid: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'recipients',
            key: 'uuid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        deliveryman_uuid: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'deliverymen',
            key: 'uuid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        signature_uuid: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'files',
            key: 'uuid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        product_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        incoming_date: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
          validate: {
            isDate: true,
          },
        },
        delivery_date: {
          type: Sequelize.DATE,
          allowNull: true,
          validate: {
            isDate: true,
          },
        },
      },
      {
        sequelize,
        validate: {
          validateHour() {
            if (!this.delivery_date) {
              return;
            }

            const initialHour = parseInt(
              `${getHours(this.incoming_date)}00`,
              10
            );

            const endingHour = parseInt(
              `${getHours(this.delivery_date)}00`,
              10
            );

            if (initialHour < 800 || endingHour > 1800) {
              throw new Error('Parcels would be delivered between 08h and 18h');
            }
          },
        },
      }
    );

    this.addHook('beforeCreate', async (parcel) => {
      parcel.uuid = uuidv4();
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'signature_uuid',
      as: 'signature',
    });

    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_uuid',
      as: 'recipient',
    });

    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliveryman_uuid',
      as: 'deliveryman',
    });
  }
}

export default Parcel;
