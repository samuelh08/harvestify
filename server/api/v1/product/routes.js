const router = require('express').Router();
const controller = require('./controller');

/*
 * /api/products/ POST - CREATE
 * /api/products/ GET - READ ALL
 * /api/products/:id GET - READ ONE
 * /api/products/:id PUT - UPDATE
 * /api/products/:id DELETE - DELETE
 */

router.route('/').post(controller.create).get(controller.all);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
