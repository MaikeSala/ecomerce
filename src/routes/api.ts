import { Router } from 'express';
import * as ProductController from '../controllers/ProductController';
import * as UserController from '../controllers/UserController';
import * as InfoController from '../controllers/InfoController';
import * as AuthController from '../controllers/AuthController';
import * as Auth from '../middlewares/Auth';
import * as AuthValidator from '../validators/AuthValidator';
import * as UserValidator from '../validators/UserValidator';
import * as ProductValidator from '../validators/ProductValidator';
import { storage, storageCat } from '../config/multercConfig';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: storage });
const uploadCat = multer({ storage: storageCat});

router.get('/',ProductController.promocaoDestaque);

router.post('/user/signin', AuthValidator.signin, AuthController.signin);
router.post('/user/signup', AuthValidator.signup, AuthController.signup);
router.get('/user/me', Auth.privates,UserController.getInfo);
router.put('/user/me', UserValidator.editAction , Auth.privates, UserController.attInfo);

router.get('/carrinho/list/', Auth.privates, UserController.carrinhoList);
router.post('/carrinho/add/', Auth.privates ,UserController.carrinhoAdd);
router.post('/carrinho/delete/', Auth.privates ,UserController.carrinhoDelete);

router.post('/produtos/add', ProductValidator.product ,Auth.privates,ProductController.addProduct);
router.post('/produtos/upload', ProductValidator.upload , Auth.privates ,upload.single("imagem"), ProductController.upload);
router.get('/produtos/list', ProductController.getList);
router.get('/produtos/item', ProductController.getItem);
router.post('/produtos/:id', ProductController.editAction);

router.get('/category/list',ProductController.getCategory);
router.post('/category/add',ProductController.addCatefory);
router.post('/category/upload',Auth.privates, uploadCat.single("imagem"), ProductController.uploadCategory);

router.get('/checkout', Auth.privates, UserController.checkout);
router.post('/checkout/post', Auth.privates, UserController.checkoutPost);

router.get('/pedidos', Auth.privates, UserController.pedidos);

router.get('/contato', InfoController.contatoInfo);
router.post('/contato/add', InfoController.contatoPost);

router.get('/sobre', InfoController.sobre);
router.post('/sobre/add', InfoController.sobreAdd);

router.get('/politicas', InfoController.politicas);
router.post('/politicas/add', InfoController.politicasAdd);

export default router;