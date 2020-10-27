import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { uuid, name, email } = await User.create(req.body);

    return res.json({
      uuid,
      name,
      email,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'This email already exists.' });
      }
    }

    if (oldPassword && !(await user.verifyPassword(user.email, oldPassword))) {
      return res.status(401).json({ error: 'Old password does not match.' });
    }

    const updatedUser = await user.update(req.body);

    return res.json({
      uuid: updatedUser.uuid,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  }
}

export default new UserController();
