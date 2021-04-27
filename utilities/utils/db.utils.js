/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-await */
const ObjectID = require('mongoose').Types.ObjectId;

/**
 *
 * @param {Object} Model
 * @param {*} unique
 * @param {String} finder
 * @param {String} populate
 * @param {String} select
 * @returns
 */
exports.ifExist = async (
  Model,
  unique,
  finder,
  populate = null,
  select = null
) => {
  let ifExist = '';
  switch (finder) {
    case 'name':
      ifExist = await Model.findOne({ name: unique })
        .populate(populate)
        .select(select);
      break;
    case 'email':
      ifExist = await Model.findOne({ email: unique })
        .populate(populate)
        .select(select);
      break;
    case '_id':
      ifExist = await Model.findOne({ _id: unique })
        .populate(populate)
        .select(select);
      break;
    default:
      break;
  }
  return ifExist;
};

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
exports.getOne = async (
  res,
  Model,
  unique,
  finder,
  populate = null,
  select = null
) => {
  if (!ObjectID.isValid(unique))
    return res.status(400).json({ message: `l'ID ${unique} n'est pas valide` });
  const single = await this.ifExist(Model, unique, finder, populate, select);
  if (single) return res.status(200).json(single);
  return res.status(400).json(`${unique} non existant`);
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Object} Model
 * @param {Object} validation
 * @param {*} unique
 * @param {String} finder
 * @returns
 */
exports.add = async (
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
  if (unique) {
    const ifExist = await this.ifExist(Model, unique, finder);
    if (ifExist) return res.status(400).json(`${unique} existant `);
  }
  let newElement = new Model({ ...req.body });
  newElement = await newElement.save();
  return res.status(201).json(newElement);
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Object} Model
 * @returns
 */
exports.deleteOne = async (req, res, Model) => {
  if (!ObjectID.isValid(req.params._id))
    return res
      .status(404)
      .json({ message: `l'ID ${req.params._id} n'est pas valide` });
  if (await Model.remove({ _id: req.params._id }).exec())
    return res.status(200).json({
      message: `${req.params._id} est supprimer avec succées`,
    });
  return res.status(400).json(`${req.params._id} non existant`);
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Object} Model
 * @param {Object} validation
 * @returns
 */
exports.update = (req, res, Model, validation = null) => {
  if (!ObjectID.isValid(req.params._id))
    return res
      .status(404)
      .json({ message: `l'ID ${req.params._id} n'est pas reconnu` });
  if (validation) {
    const { error } = validation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
  }
  Model.findByIdAndUpdate(
    { _id: req.params._id },
    { $set: { ...req.body } },
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
exports.deletAll = async (res, Model) => {
  if (await Model.deleteMany())
    return res.status(200).json({
      message: `table  supprimer`,
    });
};
