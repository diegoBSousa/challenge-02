import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const deliverymen = await Deliveryman.findAll({
      attributes: ['uuid', 'name', 'email'],
      include: {
        model: File,
        as: 'avatar',
        attributes: ['uuid', 'name', 'path', 'url'],
      },
    });

    return res.json({ deliverymen });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      avatar_uuid: Yup.string().uuid(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation has failed.' });
    }

    const { email } = req.body;

    const deliverymanExists = await Deliveryman.findOne({
      where: { email },
    });

    if (deliverymanExists) {
      return res
        .status(400)
        .json({ error: `There is a user with this email: ${email} already.` });
    }

    const deliveryman = await Deliveryman.create(req.body);

    return res.json(deliveryman);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      avatar_uuid: Yup.string().uuid(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation has failed.' });
    }

    const { email, avatar_uuid } = req.body;

    if (avatar_uuid) {
      const fileExists = await File.findByPk(avatar_uuid);
      if (!fileExists) {
        return res.status(400).json({
          error: `There is not a file with this ID: ${avatar_uuid}`,
        });
      }
    }

    const deliveryman = await Deliveryman.findByPk(req.params.deliveryman_uuid);
    if (!deliveryman) {
      return res.status(400).json({
        error: `There is not any user with this ID: ${req.params.deliveryman_uuid}`,
      });
    }

    const emailExists = await Deliveryman.findOne({
      where: { email },
    });

    if (emailExists) {
      return res.status(400).json({
        error: `There is already a Deliveryman with this email: ${email}`,
      });
    }

    await deliveryman.update(req.body);

    return res.json(deliveryman);
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.deliveryman_uuid);
    if (!deliveryman) {
      return res.status(400).json({
        error: `There is not any user with this ID: ${req.params.deliveryman_uuid}`,
      });
    }

    await deliveryman.destroy();

    return res.json({ message: `Good bye ${deliveryman.name}`, deliveryman });
  }
}

export default new DeliverymanController();
