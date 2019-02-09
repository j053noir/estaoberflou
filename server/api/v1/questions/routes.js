const router = require('express').Router();
const controller = require('./controller');
const { auth, me } = require('../auth');

// const answersRouter = require('../answers/routes');

router.param('id', controller.id);

router
  .route('/')
  .get(controller.all)
  .post(auth, controller.create);

router
  .route('/:id')
  .get(controller.read)
  .put(auth, me, controller.update)
  .delete(auth, me, controller.delete);

// router.use('/:id/answers', answersRouter);

module.exports = router;
