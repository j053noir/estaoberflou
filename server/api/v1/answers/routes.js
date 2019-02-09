const router = require('express').Router();
const controller = require('./controller');
const { auth } = require('../auth');

router.param('id', controller.id);

router
  .route('/')
  .post(auth, controller.create);

router
  .route('/:id/answers')
  .get(controller.read);

module.exports = router;
