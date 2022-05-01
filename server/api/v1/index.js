const router = require('express').Router();

const clients = require('./clients/routes');
const carts = require('./carts/routes');
const cartItems = require('./cartItems/routes');
const reviews = require('./reviews/routes');

router.use('/clients', clients);
router.use('/carts', carts);
router.use('/cartItems', cartItems);
router.use('/reviews', reviews);

module.exports = router;
