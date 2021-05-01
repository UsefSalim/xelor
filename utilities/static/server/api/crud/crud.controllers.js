const xelor = require('xelor');
const Test = require('../models/Test.models');
const { TestValidations } = require('../validations/Test.validations');

exports.addController = async (req, res) => {
  await xelor.add(req, res, Test, TestValidations);
};

exports.getAllController = async (req, res) => {
  await xelor.getAll(res, Test);
};

exports.getOneController = async (req, res) => {
  const { _id } = req.params;
  await xelor.getOne(res, Test, { _id });
};

exports.deleteOneController = async (req, res) => {
  await xelor.deleteOne(req, res, Test);
};

exports.updateOneController = async (req, res) => {
  await xelor.update(req, res, Test, TestValidations);
};

exports.deletAllController = async (req, res) => {
  await xelor.deleteAll(res, Test);
};
