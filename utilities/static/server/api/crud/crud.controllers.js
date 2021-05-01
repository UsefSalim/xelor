const xelor = require('xelor');
const ModelName = require('../models/ModelName.models');
const {
  ModelNameValidations,
} = require('../validations/ModelName.validations');

exports.addController = async (req, res) => {
  await xelor.add(req, res, ModelName, ModelNameValidations);
};

exports.getAllController = async (req, res) => {
  await xelor.getAll(res, ModelName);
};

exports.getOneController = async (req, res) => {
  const { _id } = req.params;
  await xelor.getOne(res, ModelName, { _id });
};

exports.deleteOneController = async (req, res) => {
  await xelor.deleteOne(req, res, ModelName);
};

exports.updateOneController = async (req, res) => {
  await xelor.update(req, res, ModelName, ModelNameValidations);
};

exports.deleteAllController = async (req, res) => {
  await xelor.deletAll(res, ModelName);
};
