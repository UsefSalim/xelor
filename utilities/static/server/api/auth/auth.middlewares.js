const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

exports.roleAdmin = (req, res, next) => {
  res.Role = 'Admin';
  next();
};
exports.roleUser = (req, res, next) => {
  res.Role = 'User';
  next();
};
exports.auth = async (req, res, next) => {
  const token = req.cookies.logToken;
  // console.log(token);
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (!err && decodedToken.data.role === res.Role) {
        res.currentUser = await User.findOne({
          _id: decodedToken.data._id,
        }).select('-password');
        next();
      } else {
        res.cookie('token', '', { maxAge: 1 });
        return res.status(401).json(`private root need ${res.Role} login`);
      }
    });
  } else {
    res.cookie('token', '', { maxAge: 1 });
    return res.status(400).json(`private root need ${res.Role} login`);
  }
};
