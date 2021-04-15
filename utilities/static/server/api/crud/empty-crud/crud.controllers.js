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
exports.getAll = async (req, res) => {};

/* ! @Route  : GET => api/ModelName/:id
     Desc    : Get One  ModelName
     @Access : Pubic
*/
exports.getOne = async (req, res) => {};

/* ! @Route  : POST => api/ModelNames/addModelName
     Desc    : Create ModelName
     @Access : Pubic
*/
exports.addModelName = async (req, res) => {};
/* ! @Route  : DELETE => api/ModelNames/:id
     Desc    : Delete ModelName
     @Access : Pubic
*/
exports.deletModelName = async (req, res) => {};
/* ! @Route  : DELETE => api/ModelName/
     Desc    : Delete All ModelNames
     @Access : Pubic
*/

exports.deletAllModelNames = async (req, res) => {};
/* ! @Route  : UPDATE => api/ModelName/:id
     Desc    : Update ModelName
     @Access : Pubic
*/

exports.updateModelName = (req, res) => {};
