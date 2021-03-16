const express = require('express');

const router = express.Router();

const {
  logoutController,
  loginController,
  registerController,
} = require('../controllers/auth.controllers');

/* ! @Route  : POST => /register
     Desc    : Regsiter the users
     @Access : Pubic
*/
router.post('/register', registerController);

/* ! @Route  : POST => /login
     Desc    : login the users
     @Access : Pubic
*/
router.post('/login', loginController);

/* ! @Route  : POST => /logout
     Desc    : Logout the users
     @Access : Pubic
*/
router.post('/logout', logoutController);

module.exports = router;
