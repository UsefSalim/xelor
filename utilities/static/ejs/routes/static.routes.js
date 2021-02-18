const express = require('express');

const router = express.Router();
const { homePage } = require('../controllers/static.controller');

/* ! @Route  : GET => /
     Desc    : render home Page
     @Access : Pubic
*/
router.get('/', homePage);

module.exports = router;
