const router = require('express').Router();
const controller = require('./controller');
const { auth, owner } = require('../auth');

const productsRouter = require('../products/routes');

/*
 * /api/cartItems/ POST - CREATE
 * /api/cartItems/ GET - READ ALL
 * /api/cartItems/:id GET - READ ONE
 * /api/cartItems/:id PUT - UPDATE
 * /api/cartItems/:id DELETE - DELETE
 */

router.param('id', controller.id);

/**
 * @swagger
 * definitions:
 *  NewCartItem:
 *    type: object
 *    required:
 *    - quatity
 *    properties:
 *      quantity:
 *        type: integer
 *  CartItem:
 *    allOf:
 *      - $ref: '#/definitions/NewCartItem'
 *      - properties:
 *          id:
 *            type: string
 *          created_at:
 *            type: string
 *            format: date-time
 *          update_at:
 *            type: string
 *            format: date-time
 */

router
  .route('/')
  /**
   * @swagger
   * /cartItems/:
   *  post:
   *    tags:
   *      - CartItems
   *    description: New cart item
   *    parameters:
   *      - name: cartItem
   *        description: CartItem object
   *        in: body
   *        required: true
   *        schema:
   *          $ref: '#/definitions/NewCartItem'
   *    consumes:
   *      - application/json
   *    produces:
   *      - application.json
   *    responses:
   *      200:
   *        description: CartItem
   *        schema:
   *          $ref: '#/definitions/CartItem'
   */
  .post(auth, controller.create)
  /**
   * @swagger
   * /cartItems/:
   *  get:
   *    tags:
   *      - CartItems
   *    description: Get all cart items
   *    parameters:
   *      - name: limit
   *        description: Limit number of items
   *        in: query
   *        schema:
   *          type: integer
   *      - name: skip
   *        description: Number of items to skip
   *        in: query
   *        schema:
   *          type: integer
   *      - name: page
   *        description: Number of the page
   *        in: query
   *        schema:
   *          type: integer
   *      - name: sortBy
   *        description: Sort by field name
   *        in: query
   *        schema:
   *          type: string
   *      - name: direction
   *        description: Sort order
   *        in: query
   *        schema:
   *          type: string
   *          enum: [asc, desc]
   *    produces:
   *      - application.json
   *    responses:
   *      200:
   *        description: CartItem
   *        schema:
   *          type: object
   *          properties:
   *            success:
   *              type: boolean
   *            data:
   *              type: array
   *              items:
   *                $ref: '#/definitions/CartItem'
   *            meta:
   *              type: object
   *              properties:
   *                limit:
   *                  type: integer
   *                  example: 10
   *                skip:
   *                  type: integer
   *                  example: 0
   *                total:
   *                  type: integer
   *                  example: 1
   *                page:
   *                  type: integer
   *                  example: 1
   *                sortBy:
   *                  type: string
   *                  example: created_at
   *                direction:
   *                  type: string
   *                  example: desc
   */
  .get(auth, controller.all);

router
  .route('/:id')
  /**
   * @swagger
   *
   * /cartItems/(id):
   *  get:
   *    tags:
   *      - CartItems
   *    description: Get a cart item
   *    parameters:
   *    - name: id
   *      in: path
   *      description: Cart Item id
   *      required: true
   *      type: string
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: CartItem
   *        schema:
   *          $ref: '#/definitions/CartItem'
   */
  .get(auth, controller.parentId, controller.read)
  /**
   * @swagger
   *
   * /cartItems/(id):
   *  put:
   *    tags:
   *      - CartItems
   *    description: Update a cart item
   *    parameters:
   *    - name: id
   *      in: path
   *      description: Cart item id
   *      required: true
   *      type: string
   *    - name: cart
   *      description: Post object
   *      in: body
   *      required: true
   *      schema:
   *        $ref: '#/definitions/NewCartItem'
   *    consumes:
   *      - application/json
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: CartItem
   *        schema:
   *          $ref: '#/definitions/CartItem'
   */
  .put(auth, owner, controller.parentId, controller.update)
  /**
   * @swagger
   *
   * /cartItems/(id):
   *  delete:
   *    tags:
   *      - CartItems
   *    description: Delete a cart item
   *    parameters:
   *    - name: id
   *      in: path
   *      description: Cart item id
   *      required: true
   *      type: string
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: CartItem
   *        schema:
   *          $ref: '#/definitions/CartItem'
   */
  .delete(auth, controller.parentId, controller.delete);

router.use('/:cartItemId/products', productsRouter);

module.exports = router;
