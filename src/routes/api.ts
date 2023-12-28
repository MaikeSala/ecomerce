import { Router } from 'express';

import * as productController from '../controllers/productController';
import * as userController from '../controllers/userController';
import * as infoController from '../controllers/infoController';
import * as authController from '../controllers/authController';
import * as Auth from '../middlewares/Auth';
import * as AuthValidator from '../validators/AuthValidator';
import * as UserValidator from '../validators/UserValidator';

const router = Router();

router.get('/',productController.promocaoDestaque);

router.post('/user/signin', AuthValidator.signin, authController.signin);
router.post('/user/signup', AuthValidator.signup, authController.signup);
router.get('/user/me', Auth.privates,userController.getInfo);
router.put('/user/me', UserValidator.editAction , Auth.privates, userController.attInfo);

router.post('/produtos/add', Auth.privates, productController.addProduct);
router.get('/produtos/list', productController.getList);
router.get('/produtos/item', productController.getItem);
router.get('/produtos/:id', productController.editAction);

router.get('/carrinho/list/:id', Auth.privates, userController.carrinhoList);
router.post('/carrinho/add/:id', Auth.privates ,userController.carrinhoAdd);

router.get('/checkout', Auth.privates, userController.checkout);
router.post('/checkout/post', Auth.privates, userController.checkoutPost);

router.get('/pedidos', Auth.privates, userController.pedidos);

router.get('/contato/info', infoController.contatoInfo);
router.post('/contato/add', infoController.contatoPost);

router.get('/sobre', infoController.sobre);
router.get('/politicas', infoController.politicas);

export default router;