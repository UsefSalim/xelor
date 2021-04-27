const xelor = require('xelor');
const User = require('../models/user.model');
const {
  registerValidations,
  loginValidations,
} = require('../validations/auth.validations');

exports.registerController = async (req, res) => {
  const { email } = req.body;
  await xelor.register(req, res, User, registerValidations, email, 'email');
};
exports.loginController = async (req, res) => {
  const { email } = req.body;
  await xelor.login(req, res, User, loginValidations, email, 'email');
};
exports.logoutController = () =>
  res.clearCookie('_token').json({ role: '', isAuthenticated: false });
