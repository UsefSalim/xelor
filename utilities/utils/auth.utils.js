/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ifExist } = require('./db.utils');
/**
 *
 * @param {*} data
 * @returns
 */
exports.createToken = (data) =>
  jwt.sign({ data }, process.env.SECRET_TOKEN, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Object} Model
 * @param {Object} validation
 * @param {*} unique
 * @param {String} finder
 * @param {String} Role
 * @returns
 */
exports.register = async (
  req,
  res,
  Model,
  validation = null,
  unique = null,
  finder = null,
  Role = null
) => {
  if (validation) {
    const { error } = validation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
  }
  if (unique) {
    const ifUserExist = await ifExist(Model, unique, finder);
    if (ifUserExist) return res.status(400).json(`${unique} existant `);
  }
  const newUser = new Model({ ...req.body });
  newUser.password = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(10)
  );
  if (Role) newUser.role = Role;
  const savedUser = await newUser.save();
  const token = this.createToken({ id: newUser._id, role: newUser.role });
  return res
    .status(200)
    .cookie('_token', token, {
      httpOnly: true,
      maxAge: process.env.JWT_EXPIRATION_TIME,
    })
    .json({ role: savedUser.role, isAuthenticated: true });
};

exports.login = async (
  req,
  res,
  Model,
  validation = null,
  unique = null,
  finder = null
) => {
  if (validation) {
    const { error } = validation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
  }
  const UserExist = await ifExist(Model, unique, finder);
  console.log(UserExist);
  if (
    !UserExist ||
    !(await bcrypt.compare(req.body.password, UserExist.password))
  )
    return res.status(400).json('Mail ou password Incorrect');
  const token = this.createToken({ id: UserExist._id, role: UserExist.role });
  return res
    .status(200)
    .cookie('_token', token, {
      httpOnly: true,
      maxAge: process.env.JWT_EXPIRATION_TIME,
    })
    .json({ role: UserExist.role, isAuthenticated: true });
};
