const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const email = 'admin@fastfeet.com';
    const password = '123456';
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'FastFeet Admin',
          email,
          password_hash: bcrypt.hashSync(email + password, 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', [{ name: 'FastFeet Admin' }]);
  },
};
