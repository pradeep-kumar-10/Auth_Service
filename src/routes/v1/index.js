const express = require('express');

const UserController = require('../../controllers/user-controller');
const {validateUserAuth} = require('../../middlewares/auth-request-validator');

const router = express.Router();

router.post('/signup', validateUserAuth,  UserController.createUser);
router.post('/signin', validateUserAuth,  UserController.signIn)
router.get('/isAuthenticated', UserController.isAuthenticated);

module.exports = router;