const express = require('express');

const authRoutes = express.Router();
const {
  registerController,
  loginController,
  logoutController,
} = require('../controllers/auth.controllers');

authRoutes.post('/register', registerController);
authRoutes.post('/login', loginController);
authRoutes.get('/logout', logoutController);

module.exports = authRoutes;
