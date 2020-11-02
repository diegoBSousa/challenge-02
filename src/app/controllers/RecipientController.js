import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address_line_1: Yup.string().required(),
      address_line_2: Yup.string(),
      address_line_3: Yup.string(),
      address_line_4: Yup.string(),
      city: Yup.string().required(),
      state_provincy: Yup.string().required(),
      address_code: Yup.string(),
      country: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation has failed.' });
    }

    const {
      name,
      address_line_1,
      address_line_2,
      address_line_3,
      address_line_4,
      city,
      state_provincy,
      address_code,
      country,
    } = req.body;

    const recipientExists = await Recipient.findOne({
      where: { name, address_line_1, city, state_provincy, country },
    });

    if (recipientExists) {
      return res.status(400).json({ error: 'Address already exists.' });
    }

    const recipient = await Recipient.create({
      name,
      address_line_1,
      address_line_2,
      address_line_3,
      address_line_4,
      city,
      state_provincy,
      address_code,
      country,
    });

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      uuid: Yup.string().uuid().required(),
      name: Yup.string(),
      address_line_1: Yup.string(),
      address_line_2: Yup.string(),
      address_line_3: Yup.string(),
      address_line_4: Yup.string(),
      city: Yup.string(),
      state_provincy: Yup.string(),
      address_code: Yup.string(),
      country: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation has failed.' });
    }

    const recipient = await Recipient.findOne({
      where: { uuid: req.body.uuid },
    });

    if (!recipient) {
      return res.status(400).json({ error: 'Address does not exists.' });
    }

    await recipient.update(req.body);

    return res.json(recipient);
  }
}

export default new RecipientController();
