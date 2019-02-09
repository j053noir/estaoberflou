const router = require('express').Router();
const controller = require('./controller');

router.param('id', controller.id);

router
  .route('/')
  .post(controller.create);

router
  .route('/:id')
  .get(controller.read);

module.exports = router;
