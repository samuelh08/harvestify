const router = require('express').Router();
const controller = require('./controller');

/*
 * /api/clients/ POST - CREATE
 * /api/clients/:id GET - READ ONE
 * /api/clients/:id PUT - UPDATE
 * /api/clients/:id DELETE - DELETE
 */

router.route('/').post(controller.create);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
