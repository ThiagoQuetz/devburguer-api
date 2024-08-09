import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import sessionController from './app/controllers/sessionController';
import ProductController from './app/controllers/ProductController';
import CategoryController from './app/controllers/CategoryController';
import OrderController from './app/controllers/OrderController';



const routes = new Router()

const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', sessionController.store);

routes.use(authMiddleware);

routes.post('/products', upload.single('file'),ProductController.store);
routes.get('/products', ProductController.index);

routes.post('/categories', CategoryController.store);
routes.get('/categories', CategoryController.index);

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);

export default routes;