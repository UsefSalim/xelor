const { register, login } = require('xelor');
const User = require('../models/user.models');
const {
  registerValidations,
  loginValidations,
} = require('../validations/auth.validations');

exports.registerController = async (req, res) => {
  const { email } = req.body;
  await register(req, res, User, registerValidations, email, 'email');
};
exports.loginController = async (req, res) => {
  const { email } = req.body;
  await login(req, res, User, loginValidations, email, 'email');
};
exports.logoutController = (req,res) =>
  res.clearCookie('_token').json({ role: '', isAuthenticated: false });
