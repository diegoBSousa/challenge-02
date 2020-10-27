import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    if (!(await user.verifyPassword(email, password))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    const { uuid, name } = user;

    return res.json({
      user: {
        uuid,
        name,
        email,
      },
      token: jwt.sign({ uuid }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();