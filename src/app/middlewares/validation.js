import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.string().uuid();

  if (!(await schema.isValid(req.params.deliveryman_uuid))) {
    return res.status(400).json({
      error: `Invalid input syntax for type uuid: "${req.params.deliveryman_uuid}"`,
    });
  }

  return next();
};
