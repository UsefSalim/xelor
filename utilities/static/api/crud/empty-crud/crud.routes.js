const express = require('express');

const router = express.Router();

const {
  getAll,
  addModelName,
  deletModelName,
  deletAllModelNames,
  getOne,
  updateModelName,
} = require('../controllers/ModelName.controllers');

/// * ------------------------- ModelName Route

/* ! @Route  : GET => api/ModelName
     Desc    : Get all ModelNames 
     @Access : Pubic
*/
router.get('/', getAll);

/* ! @Route  : GET => api/ModelName/:id
     Desc    : Get One  ModelName
     @Access : Pubic
*/
router.get('/:id', getOne);

/* ! @Route  : POST => api/ModelName
     Desc    : Create ModelName
     @Access : Pubic
*/

router.post('/add', addModelName);

/* ! @Route  : POST => api/ModelName/id
     Desc    : Delete One ModelName
     @Access : Pubic
*/
router.delete('/:id', deletModelName);

/* ! @Route  : DELETE => api/ModelName/
     Desc    : Delete All ModelNames
     @Access : Pubic
*/
router.delete('/', deletAllModelNames);

/* ! @Route  : UPDATE => api/ModelName/:id
     Desc    : UPDATE  ModelName
     @Access : Pubic
*/
router.put('/:id', updateModelName);

module.exports = router;
