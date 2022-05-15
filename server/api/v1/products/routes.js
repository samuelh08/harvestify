const router = require('express').Router({
  mergeParams: true,
});
const controller = require('./controller');
const { auth, owner } = require('../auth');

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
  .get(auth, owner, controller.read)
  .put(auth, owner, controller.update)
  .delete(auth, owner, controller.delete);

module.exports = router;
