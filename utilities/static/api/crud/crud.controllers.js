/// * -------------------------------------------------------------------------- ModelName Controllers
// ------------- require mongoose ObjectId ----//
const ObjectID = require('mongoose').Types.ObjectId;

// -------------require models----------  //
const ModelName = require('../models/ModelName.models');

// -------------require validations----------  //
const {
  ModelNameValidations,
} = require('../validations/ModelName.validations');

/* ! @Route  : GET => api/ModelNames
     Desc    : Get all ModelNames
     @Access : Pubic
*/
exports.getAll = async (req, res) => {
  try {
    const all = await ModelName.find();
    if (all) return res.status(200).json(all);
  } catch (err) {
    return res.status(400).json({ getAllModelNameError: err });
  }
};

/* ! @Route  : GET => api/ModelName/:id
     Desc    : Get One  ModelName
     @Access : Pubic
*/
exports.getOne = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(404).json({
      getOneModelNameError: `l'ID ${req.params.id} n'est pas valid`,
    });
  try {
    const currentModelName = await ModelName.findOne({ _id: req.params.id });
    if (currentModelName) return res.status(200).json(currentModelName);
    return res.status(404).json({
      getOneModelNameError: `l'ID ${req.params.id} n'est pas disponible `,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

/* ! @Route  : POST => api/ModelNames/addModelName
     Desc    : Create ModelName
     @Access : Pubic
*/
exports.addModelName = async (req, res) => {
  const { error } = ModelNameValidations(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  const newModelName = new ModelName({ ...req.body });
  try {
    if (await newModelName.save()) return res.status(201).json(newModelName);
  } catch (err) {
    return res.status(400).json(err);
  }
};
/* ! @Route  : DELETE => api/ModelNames/:id
     Desc    : Delete ModelName
     @Access : Pubic
*/
exports.deletModelName = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res
      .status(400)
      .json({ message: `l'ID ${req.params.id} n'est pas reconnu` });
  try {
    if (await ModelName.remove({ _id: req.params.id }).exec())
      return res.status(200).json({
        message: `ModelName avec l'id ${req.params.id} est supprimer avec succées`,
      });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
/* ! @Route  : DELETE => api/ModelName/
     Desc    : Delete All ModelNames
     @Access : Pubic
*/

exports.deletAllModelNames = async (req, res) => {
  try {
    if (await ModelName.deleteMany())
      return res.status(200).json({
        message: '0 element veiller rajouter un element a la todo liste',
      });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
/* ! @Route  : UPDATE => api/ModelName/:id
     Desc    : Update ModelName
     @Access : Pubic
*/

exports.updateModelName = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res
      .status(404)
      .json({ message: `l'ID ${req.params.id} n'est pas reconnu` });
  const { error } = ModelNameValidations(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  try {
    ModelName.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true, useFindAndModify: true, upsert: true },
      (err, ModelName) => {
        !err ? res.status(200).json(ModelName) : res.status(400).json({ err });
      }
    );
  } catch (err) {
    return res.status(400).json({ err });
  }
};
