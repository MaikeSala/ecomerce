import { Router } from 'express';

import * as productController from '../controllers/ProductController';
import * as userController from '../controllers/UserController';
import * as infoController from '../controllers/InfoController';
import * as authController from '../controllers/AuthController';
import * as Auth from '../middlewares/Auth';
import * as AuthValidator from '../validators/AuthValidator';
import * as UserValidator from '../validators/UserValidator';

const router = Router();

router.get('/',productController.promocaoDestaque);

router.post('/user/signin', AuthValidator.signin, authController.signin);
router.post('/user/signup', AuthValidator.signup, authController.signup);
router.get('/user/me', Auth.privates,userController.getInfo);
router.put('/user/me', UserValidator.editAction , Auth.privates, userController.attInfo);

router.get('/carrinho/list/', Auth.privates, userController.carrinhoList);
router.post('/carrinho/add/', Auth.privates ,userController.carrinhoAdd);
router.post('/carrinho/delete/', Auth.privates ,userController.carrinhoDelete);

router.post('/produtos/add', Auth.privates, productController.addProduct);
router.get('/produtos/list', productController.getList);
router.get('/produtos/item', productController.getItem);
router.get('/produtos/:id', productController.editAction);

router.get('/checkout', Auth.privates, userController.checkout);
router.post('/checkout/post', Auth.privates, userController.checkoutPost);

router.get('/pedidos', Auth.privates, userController.pedidos);

router.get('/contato/info', infoController.contatoInfo);
router.post('/contato/add', infoController.contatoPost);

router.get('/sobre', infoController.sobre);
router.get('/politicas', infoController.politicas);

export default router;