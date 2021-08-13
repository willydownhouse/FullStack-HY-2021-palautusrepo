const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/login').post(authController.login);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

module.exports = router;
