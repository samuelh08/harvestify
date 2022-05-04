const router = require('express').Router();
const controller = require('./controller');

/*
 * /api/reviews/ POST - CREATE
 * /api/reviews/ GET - READ ALL
 * /api/reviews/:id GET - READ ONE
 * /api/reviews/:id PUT - UPDATE
 * /api/reviews/:id DELETE - DELETE
 */

router.route('/').post(controller.create).get(controller.all);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
