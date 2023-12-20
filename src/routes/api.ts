import { Router } from 'express';

import * as productController from '../controllers/productController';
import * as userController from '../controllers/userController';
import * as infoController from '../controllers/infoController';

const router = Router();

router.get('/', productController.promocaoDestaque);

router.post('/user/signin',userController.signin);
router.post('/user/signup',userController.signup);
router.put('/user/att',userController.attInfo);
router.get('/user/me',userController.getInfo);

router.get('/produtos/add', productController.addProduct);
router.get('/produtos/list', productController.getList);
router.get('/produtos/item', productController.getItem);
router.get('/produtos/:id', productController.editAction);

router.get('/carrinho/list', userController.carrinhoList);
router.post('/carrinho/add', userController.carrinhoAdd);

router.get('/checkout', userController.checkout);
router.post('/checkout/post', userController.checkoutPost);

router.get('/pedidos', userController.pedidos);

router.get('/contato/info', infoController.contatoInfo);
router.post('/contato/add', infoController.contatoPost);

router.get('/sobre', infoController.sobre);
router.get('/politicas', infoController.politicas);


router.put('/attperfil')

export default router;