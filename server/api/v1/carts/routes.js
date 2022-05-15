const router = require('express').Router({
  mergeParams: true,
});
const controller = require('./controller');
const { auth, owner } = require('../auth');
const cartItemsRouter = require('../cartItems/routes');
const reviewsRouter = require('../reviews/routes');
const { sanitizers } = require('./model');

/*
 * /api/carts/ POST - CREATE
 * /api/carts/ GET - READ ALL
 * /api/carts/:id GET - READ ONE
 * /api/carts/:id PUT - UPDATE
 * /api/carts/:id DELETE - DELETE
 */

router.param('id', controller.id);

/**
 * @swagger
 * definitions:
 *  NewCart:
 *    type: object
 *    required:
 *    - address
 *    - deliveryPrice
 *    - total
 *    properties:
 *      address:
 *        type: string
 *      deliveryPrice:
 *        type: integer
 *      total:
 *        type: integer
 *  Cart:
 *    allOf:
 *      - $ref: '#/definitions/NewCart'
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
   * /carts/:
   *  post:
   *    tags:
   *      - Carts
   *    description: New cart
   *    parameters:
   *      - name: cart
   *        description: Cart object
   *        in: body
   *        required: true
   *        schema:
   *          $ref: '#/definitions/NewCart'
   *    consumes:
   *      - application/json
   *    produces:
   *      - application.json
   *    responses:
   *      200:
   *        description: Cart
   *        schema:
   *          $ref: '#/definitions/Cart'
   */
  .post(auth, sanitizers, controller.parentId, controller.create)
  /**
   * @swagger
   * /carts/:
   *  get:
   *    tags:
   *      - Carts
   *    description: Get all carts
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
   *        description: Cart
   *        schema:
   *          type: object
   *          properties:
   *            success:
   *              type: boolean
   *            data:
   *              type: array
   *              items:
   *                $ref: '#/definitions/Cart'
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
  .get(auth, controller.parentId, controller.all);

router
  .route('/:id')
  /**
   * @swagger
   *
   * /carts/(id):
   *  get:
   *    tags:
   *      - Carts
   *    description: Get a cart
   *    parameters:
   *    - name: id
   *      in: path
   *      description: Cart id
   *      required: true
   *      type: string
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Cart
   *        schema:
   *          $ref: '#/definitions/Cart'
   */
  .get(auth, controller.parentId, controller.read)
  /**
   * @swagger
   *
   * /carts/(id):
   *  put:
   *    tags:
   *      - Carts
   *    description: Update a cart
   *    parameters:
   *    - name: id
   *      in: path
   *      description: Cart id
   *      required: true
   *      type: string
   *    - name: cart
   *      description: Post object
   *      in: body
   *      required: true
   *      schema:
   *        $ref: '#/definitions/NewCart'
   *    consumes:
   *      - application/json
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Cart
   *        schema:
   *          $ref: '#/definitions/Cart'
   */
  .put(auth, owner, sanitizers, controller.parentId, controller.update)
  /**
   * @swagger
   *
   * /carts/(id):
   *  delete:
   *    tags:
   *      - Carts
   *    description: Delete a cart
   *    parameters:
   *    - name: id
   *      in: path
   *      description: Cart id
   *      required: true
   *      type: string
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Cart
   *        schema:
   *          $ref: '#/definitions/Cart'
   */
  .delete(auth, owner, controller.parentId, controller.delete);

router.use('/:cartId/cartItems', cartItemsRouter);
router.use('/:cartId/reviews', reviewsRouter);

module.exports = router;
