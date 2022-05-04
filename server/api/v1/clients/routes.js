const router = require('express').Router();
const cartsRouter = require('../carts/routes');
const controller = require('./controller');

/*
 * /api/clients/signup POST - CREATE
 * /api/clients/ GET - READ ALL
 * /api/clients/login POST - LOGIN
 * /api/clients/:id GET - READ ONE
 * /api/clients/:id PUT - UPDATE
 * /api/clients/:id DELETE - DELETE
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

router.use('/:clientId/carts', cartsRouter);

module.exports = router;
