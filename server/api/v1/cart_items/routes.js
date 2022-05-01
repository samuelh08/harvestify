const router = require('express').Router();
const controller = require('./controller');

/*
 * /api/cart_items/ POST - CREATE
 * /api/cart_items/:id GET - READ ONE
 * /api/cart_items/:id PUT - UPDATE
 * /api/cart_items/:id DELETE - DELETE
 */

router.route('/').post(controller.create).get(controller.all);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
