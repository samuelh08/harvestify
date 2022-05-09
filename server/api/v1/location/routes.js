const router = require('express').Router();
const controller = require('./controller');
const { auth, owner } = require('../auth');

/*
 * /api/location/ POST - CREATE
 * /api/location/ GET - READ ALL
 * /api/location/:id GET - READ ONE
 * /api/location/:id PUT - UPDATE
 * /api/location/:id DELETE - DELETE
 */

router.route('/').post(controller.create).get(controller.all);

router.param('id', controller.id);

router
  .route('/:id')
  .get(auth, owner, controller.read)
  .put(auth, owner, controller.update)
  .delete(auth, owner, controller.delete);

module.exports = router;
