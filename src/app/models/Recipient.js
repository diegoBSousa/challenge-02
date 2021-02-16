import Sequelize, { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        uuid: {
          type: Sequelize.UUID,
          primaryKey: true,
        },
        name: Sequelize.STRING,
        address_line_1: Sequelize.STRING,
        address_line_2: Sequelize.STRING,
        address_line_3: Sequelize.STRING,
        address_line_4: Sequelize.STRING,
        city: Sequelize.STRING,
        state_provincy: Sequelize.STRING,
        address_code: Sequelize.STRING,
        country: Sequelize.STRING,
      },
      { sequelize }
    );

    this.addHook('beforeCreate', async (recipient) => {
      recipient.uuid = uuidv4();
    });

    return this;
  }
}

export default Recipient;
