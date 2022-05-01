const router = require('express').Router();
const controller = require('./controller');

/*
 * /api/cartItems/ POST - CREATE
 * /api/cartItems/:id GET - READ ONE
 * /api/cartItems/:id PUT - UPDATE
 * /api/cartItems/:id DELETE - DELETE
 */

router.route('/').post(controller.create).get(controller.all);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
