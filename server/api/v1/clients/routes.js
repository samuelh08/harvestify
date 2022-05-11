const router = require('express').Router();
const cartsRouter = require('../carts/routes');
const controller = require('./controller');
const { auth, me } = require('../auth');
const { sanitizers } = require('./model');

/*
 * /api/clients/signup POST - CREATE
 * /api/clients/ GET - READ ALL
 * /api/clients/login POST - LOGIN
 * /api/clients/:id GET - READ ONE
 * /api/clients/:id PUT - UPDATE
 * /api/clients/:id DELETE - DELETE
 */

router.param('id', controller.id);

router.route('/').get(controller.all);

router.route('/signup').post(sanitizers, controller.signup);
router.route('/login').post(sanitizers, controller.login);

router
  .route('/:id')
  .get(auth, me, controller.read)
  .put(auth, me, sanitizers, controller.update)
  .delete(auth, me, controller.delete);

router.use('/:clientId/carts', cartsRouter);

module.exports = router;
