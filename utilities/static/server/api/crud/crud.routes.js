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

/* ! @Route  : GET => /
     Desc    : Get all ModelNames 
     @Access : Pubic
*/
router.get('/', getAll);

/* ! @Route  : GET => /:id
     Desc    : Get One  ModelName
     @Access : Pubic
*/
router.get('/:id', getOne);

/* ! @Route  : POST => /add
     Desc    : Create ModelName
     @Access : Pubic
*/

router.post('/add', addModelName);

/* ! @Route  : POST => /:id
     Desc    : Delete One ModelName
     @Access : Pubic
*/
router.delete('/:id', deletModelName);

/* ! @Route  : DELETE => /
     Desc    : Delete All ModelNames
     @Access : Pubic
*/
router.delete('/', deletAllModelNames);

/* ! @Route  : UPDATE => /:id
     Desc    : UPDATE  ModelName
     @Access : Pubic
*/
router.put('/:id', updateModelName);

module.exports = router;
