const router = require('express').Router();

const controller = require('./controller');

router.route('/').get(controller.all);
router.route('/user').post(controller.crear);

router
  .route('/:email')
  .get(controller.read)
  .put(controller.update)
  .patch(controller.update);

router
  .route('/:email/:activo')
  .put(controller.activo)
  .patch(controller.activo);

module.exports = router;
