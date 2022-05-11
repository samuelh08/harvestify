const router = require('express').Router({
  mergeParams: true,
});
const controller = require('./controller');
const { auth, owner } = require('../auth');
const cartItemsRouter = require('../cartItems/routes');
const reviewsRouter = require('../reviews/routes');
const { sanitizers } = require('./model');

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
  .post(auth, sanitizers, controller.parentId, controller.create)
  .get(auth, controller.parentId, controller.all);

router
  .route('/:id')
  .get(auth, controller.parentId, controller.read)
  .put(auth, owner, sanitizers, controller.parentId, controller.update)
  .delete(auth, owner, controller.parentId, controller.delete);

router.use('/:cartId/cartItems', cartItemsRouter);
router.use('/:cartId/reviews', reviewsRouter);

module.exports = router;
