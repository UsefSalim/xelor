const { auth } = require('xelor');

exports.authMiddleware = (Role, Model) => async (req, res, next) => {
  res.Role = Role;
  res.Model = Model;
  await auth(req, res, next);
};
