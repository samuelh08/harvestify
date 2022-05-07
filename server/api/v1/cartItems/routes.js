const router = require('express').Router();
const controller = require('./controller');
const { auth, owner } = require('../auth');

/*
 * /api/cartItems/ POST - CREATE
 * /api/cartItems/ GET - READ ALL
 * /api/cartItems/:id GET - READ ONE
 * /api/cartItems/:id PUT - UPDATE
 * /api/cartItems/:id DELETE - DELETE
 */

router.route('/').post(auth, controller.create).get(auth, controller.all);

router.param('id', controller.id);

router
  .route('/:id')
  .get(auth, controller.read)
  .put(auth, owner, controller.update)
  .delete(auth, owner, controller.delete);

module.exports = router;
