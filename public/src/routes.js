const express = require('express');
const router = express.Router();

const Auth = require('./middlewares/Auth');

const AuthValidator = require('./validators/AuthValidator');
const AuthValidator = require('./validators/UserValidator');

const AuthController = require('./controllers/AuthCountroller');
const AdsController = require('./controllers/AdsController');
const UserController = require('./controllers/UserController');

router.get('/ping',(req, res)=> {
    res.json({pong: true});
});

router.get('/states', UserController.getStates);

router.post('/user/signin',AuthValidator.signin,AuthController.signin);
router.post('/user/signup',AuthValidator.signup,AuthController.signup);

router.get('/user/me',Auth.private,UserController.info);

router.put('/user/me',UserValidator.editAction,Auth.private, UserController.editAction);

router.get('/categories', AdsController.getCategories);

router.post('/ad/add',AdsController.addAction);

router.get('ad/list',Auth.private, AdsController.getList);

router.get('ad/item', AdsController.getItem);

router.post('/ad/:id',Auth.private, AdsController.editAction);




module.exports = router;
