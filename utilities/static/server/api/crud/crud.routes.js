const testRoutes = express.Router();
const {
  addController,
  getAllController,
  getOneController,
  deleteOneController,
  updateOneController,
  deletAllController,
} = require('../controllers/test.controllers');

testRoutes.get('/', getAllController);
testRoutes.delete('/', deletAllController);
testRoutes.post('/add', addController);
testRoutes.get('/:_id', getOneController);
testRoutes.delete('/:_id', deleteOneController);
testRoutes.put('/:_id', updateOneController);

module.exports = testRoutes;
