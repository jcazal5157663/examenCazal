var express = require('express');
var router = express.Router();
//import controller
var controller = require('../controllers/cities');

//defined routes
router.get('/', controller.listAll);
router.get('/:id', controller.searchById);
router.post('/', controller.create);
router.put('/:id', controller.updateById);
router.delete('/:id', controller.deleteById);

module.exports = router;
