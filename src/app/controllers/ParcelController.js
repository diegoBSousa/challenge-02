import * as Yup from 'yup';
import Parcel from '../models/Parcel';

class ParcelController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_uuid: Yup.string().uuid().required(),
      deliveryman_uuid: Yup.string().uuid(),
      signature_uuid: Yup.string().uuid(),
      product_name: Yup.string().required(),
      description: Yup.string(),
      delivery_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation has failed.' });
    }

    const parcel = await Parcel.create(req.body);

    return res.json(parcel);
  }
}

export default new ParcelController();
