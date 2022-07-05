const router = require('express').Router({
  mergeParams: true,
});
const controller = require('./controller');
const { auth, owner } = require('../auth');
const upload = require('../upload');

/*
 * /api/products/ POST - CREATE
 * /api/products/ GET - READ ALL
 * /api/products/:id GET - READ ONE
 * /api/products/:id PUT - UPDATE
 * /api/products/:id DELETE - DELETE
 */

router.param('id', controller.id);

/**
 * @swagger
 * definitions:
 *  NewProduct:
 *    type: object
 *    required:
 *    - quantity
 *    - unit
 *    - name
 *    - picture
 *    - category
 *    - price
 *    properties:
 *      quantity:
 *        type: integer
 *      unit:
 *        type: string
 *      name:
 *        type: string
 *      picture:
 *        type: string
 *      category:
 *        type: string
 *      price:
 *        type: integer
 *  Product:
 *    allOf:
 *      - $ref: '#/definitions/NewProduct'
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
   * /products/:
   *  post:
   *    tags:
   *      - Products
   *    description: New product
   *    parameters:
   *      - name: product
   *        description: Product object
   *        in: body
   *        required: true
   *        schema:
   *          $ref: '#/definitions/NewProduct'
   *    consumes:
   *      - application/json
   *    produces:
   *      - application.json
   *    responses:
   *      200:
   *        description: Product
   *        schema:
   *          $ref: '#/definitions/Product'
   */
  .post(auth, upload.single('picture'), controller.create)
  /**
   * @swagger
   * /products/:
   *  get:
   *    tags:
   *      - Products
   *    description: Get all products
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
   *        description: Product
   *        schema:
   *          type: object
   *          properties:
   *            success:
   *              type: boolean
   *            data:
   *              type: array
   *              items:
   *                $ref: '#/definitions/Product'
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
  .get(controller.all);

router
  .route('/:id')
  /**
   * @swagger
   *
   * /products/(id):
   *  get:
   *    tags:
   *      - Products
   *    description: Get a product
   *    parameters:
   *    - name: id
   *      in: path
   *      description: Product id
   *      required: true
   *      type: string
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Product
   *        schema:
   *          $ref: '#/definitions/Product'
   */
  .get(auth, owner, controller.read)
  /**
   * @swagger
   *
   * /products/(id):
   *  put:
   *    tags:
   *      - Products
   *    description: Update a product
   *    parameters:
   *    - name: id
   *      in: path
   *      description: Product id
   *      required: true
   *      type: string
   *    - name: product
   *      description: Post object
   *      in: body
   *      required: true
   *      schema:
   *        $ref: '#/definitions/NewProduct'
   *    consumes:
   *      - application/json
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Product
   *        schema:
   *          $ref: '#/definitions/Product'
   */
  .put(auth, owner, controller.update)
  /**
   * @swagger
   *
   * /products/(id):
   *  delete:
   *    tags:
   *      - Products
   *    description: Delete a product
   *    parameters:
   *    - name: id
   *      in: path
   *      description: Product id
   *      required: true
   *      type: string
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Product
   *        schema:
   *          $ref: '#/definitions/Product'
   */
  .delete(auth, owner, controller.delete);

module.exports = router;
