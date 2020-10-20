import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    uuid: uuidv4(),
    name: 'Diego Brito Sousa',
    email: 'diego2@diegosousa.com.br',
    password_hash: '123456',
  });
  res.json(user);
});

export default routes;
