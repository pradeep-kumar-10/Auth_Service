const express = require('express');

const UserController = require('../../controllers/user-controller');
const {validateUserAuth, validateIsAdmin} = require('../../middlewares/auth-request-validator');

const router = express.Router();

router.post('/signup', validateUserAuth,  UserController.createUser);
router.post('/signin', validateUserAuth,  UserController.signIn)
router.get('/isAuthenticated', UserController.isAuthenticated);
router.get('/isadmin', validateIsAdmin, UserController.isAdmin)

module.exports = router;