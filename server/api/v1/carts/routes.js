const router = require('express').Router({
  mergeParams: true,
});
const cartItemsRouter = require('../cartItems/routes');
const controller = require('./controller');

/*
 * /api/carts/ POST - CREATE
 * /api/carts/ GET - READ ALL
 * /api/carts/:id GET - READ ONE
 * /api/carts/:id PUT - UPDATE
 * /api/carts/:id DELETE - DELETE
 */

router.param('id', controller.id);

router
  .route('/')
  .post(controller.parentId, controller.create)
  .get(controller.parentId, controller.all);

router
  .route('/:id')
  .get(controller.parentId, controller.read)
  .put(controller.parentId, controller.update)
  .delete(controller.parentId, controller.delete);

router.use('/:cartId/cartItems', cartItemsRouter);

module.exports = router;
