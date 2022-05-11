const router = require('express').Router();
// const locationRouter = require('../location/routes');
const controller = require('./controller');

/*
 * /api/producers/signup POST - CREATE
 * /api/producers/ GET - READ ALL
 * /api/producers/login POST - LOGIN
 * /api/producers/:id GET - READ ONE
 * /api/producers/:id PUT - UPDATE
 * /api/producers/:id DELETE - DELETE
 */

router.route('/').get(controller.all);

router.route('/signup').get(controller.signup);

router.route('/login').get(controller.login);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

// router.use('/:producerId/location', locationRouter);

module.exports = router;
