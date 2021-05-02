/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ObjectID = require('mongoose').Types.ObjectId;

/**
 *
 * @param {Object} Model
 * @param {Object} finder
 * @param {String} populate
 * @param {String} select
 * @returns
 */
exports.ifExist = async (Model, finder, populate = null, select = null) =>
  await Model.findOne(finder).populate(populate).select(select);

/**
 *
 * @param {Response} res
 * @param {Object} Model
 * @param {String} populate
 * @param {String} select
 * @param {String} sort
 * @param {Number} limit
 * @returns
 */
exports.getAll = async (
  res,
  Model,
  populate = null,
  select = null,
  sort = null,
  limit = null
) => {
  const all = await Model.find()
    .populate(populate)
    .select(select)
    .sort(sort)
    .limit(limit);
  if (all) return res.status(200).json(all);
};

/**
 *
 * @param {Response} res
 * @param {Object} Model
 * @param {*} unique
 * @param {String} finder
 * @param {String} populate
 * @param {String} select
 * @returns
 */
exports.getOne = async (res, Model, finder, populate = null, select = null) => {
  if (finder._id && !ObjectID.isValid(finder._id))
    return res.status(400).json({ message: `l'ID ${finder} n'est pas valide` });
  const single = await this.ifExist(Model, finder, populate, select);
  if (single) return res.status(200).json(single);
  return res.status(400).json(`element non existant`);
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Object} Model
 * @param {Object} validation
 * @param {Object} finder
 * @param {Object} multer
 * @returns
 */
exports.add = async (
  req,
  res,
  Model,
  validation = null,
  finder = null,
  multer = null
) => {
  let newElement;
  if (validation) {
    const { error } = validation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
  }
  if (finder) {
    const ifExist = await this.ifExist(Model, finder);
    if (ifExist) return res.status(400).json(`element existant `);
  }
  !multer
    ? (newElement = new Model({ ...req.body }))
    : (newElement = new Model({ ...req.body, ...multer }));
  newElement = await newElement.save();
  return res.status(201).json(newElement);
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Object} Model
 * @param {Object} finder
 * @returns
 */
exports.deleteOne = async (req, res, Model, finder = null) => {
  if (!ObjectID.isValid(req.params._id))
    return res
      .status(404)
      .json({ message: `l'ID ${req.params._id} n'est pas valide` });

  if (finder && (await Model.remove(finder).exec()))
    return res.status(200).json({
      message: `${finder} est supprimer avec succées`,
    });
  if (await Model.remove({ _id: req.params._id }).exec())
    return res.status(200).json({
      message: `${req.params._id} est supprimer avec succées`,
    });
  return res.status(400).json(`element non existant`);
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Object} Model
 * @param {Object} validation
 * @param {Object} multer
 * @returns
 */
exports.update = (req, res, Model, validation = null, multer = null) => {
  if (!ObjectID.isValid(req.params._id))
    return res
      .status(404)
      .json({ message: `l'ID ${req.params._id} n'est pas reconnu` });
  if (validation) {
    const { error } = validation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
  }
  multer
    ? Model.findByIdAndUpdate(
        { _id: req.params._id },
        { $set: { ...req.body } },
        { new: true, useFindAndModify: true, upsert: true },
        (err, updated) => {
          !err ? res.status(200).json(updated) : res.status(400).json({ err });
        }
      )
    : Model.findByIdAndUpdate(
        { _id: req.params._id },
        { $set: { ...req.body, ...multer } },
        { new: true, useFindAndModify: true, upsert: true },
        (err, updated) => {
          !err ? res.status(200).json(updated) : res.status(400).json({ err });
        }
      );
};
/**
 *
 * @param {Response} res
 * @param {Object} Model
 * @returns
 */
exports.deleteAll = async (res, Model) => {
  if (await Model.deleteMany())
    return res.status(200).json({
      message: `table  supprimer`,
    });
};
// =================== Auth ======================//
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
  finder = null,
  Role = null
) => {
  if (validation) {
    const { error } = validation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
  }
  if (finder) {
    const ifUserExist = await this.ifExist(Model, finder);
    if (ifUserExist) return res.status(400).json(`${finder} existant `);
  }
  const newUser = new Model({ ...req.body });
  newUser.password = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(10)
  );
  if (Role) newUser.role = Role;
  const savedUser = await newUser.save();
  if (savedUser) {
    const token = this.createToken({ id: newUser._id, role: newUser.role });
    return res
      .status(200)
      .cookie('_token', token, {
        httpOnly: true,
        maxAge: process.env.JWT_EXPIRATION_TIME,
      })
      .json({ role: savedUser.role, isAuthenticated: true });
  }
};

exports.login = async (req, res, Model, validation = null, finder = null) => {
  if (validation) {
    const { error } = validation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
  }
  const UserExist = await this.ifExist(Model, finder);
  if (
    !UserExist ||
    !(await bcrypt.compare(req.body.password, UserExist.password))
  )
    return res.status(400).json('identifiant ou password Incorrect');
  const token = this.createToken({ id: UserExist._id, role: UserExist.role });
  return res
    .status(200)
    .cookie('_token', token, {
      httpOnly: true,
      maxAge: process.env.JWT_EXPIRATION_TIME,
    })
    .json({ role: UserExist.role, isAuthenticated: true });
};
// ==============Middleware ==================== //
exports.auth = async (req, res, next) => {
  const token = req.cookies._token;
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (!err && decodedToken.data.role === res.Role) {
        res.currentUser = await res.Model.findOne({
          _id: decodedToken.data.id,
        }).select('-password');
        next();
      } else {
        res.clearCookie('_token').json(`private root need ${res.Role} login`);
      }
    });
  } else {
    return res.status(400).json(`private root need ${res.Role} login`);
  }
};

exports.verifIsAuthenticated = (req, res) => {
  const token = req.cookies._token;
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) => {
      if (err) {
        res.clearCookie('_token').json('private root need login');
      } else {
        res
          .status(200)
          .json({ role: decodedToken.data.role, isAuthenticated: true });
      }
    });
  } else {
    res.json({ role: '', isAuthenticated: false });
  }
};
