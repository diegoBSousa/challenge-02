import { Router } from 'express';
import multer from 'multer';
import DeliverymanController from './app/controllers/DeliverymanController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import ParcelController from './app/controllers/ParcelController';
import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import authMiddleware from './app/middlewares/auth';
import validationMiddleware from './app/middlewares/validation';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users/', UserController.store);
routes.post('/sessions/', SessionController.store);

routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.store);
routes.put('/users/', UserController.update);
routes.post('/recipients/', RecipientController.store);
routes.put('/recipients/', RecipientController.update);

routes.get('/deliveryman/', DeliverymanController.index);
routes.post('/deliveryman/', DeliverymanController.store);

routes.put(
  '/deliveryman/:deliveryman_uuid',
  validationMiddleware,
  DeliverymanController.update
);

routes.delete(
  '/deliveryman/:deliveryman_uuid',
  validationMiddleware,
  DeliverymanController.delete
);

routes.post('/parcels/', ParcelController.store);

export default routes;
