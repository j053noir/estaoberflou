const router = require('express').Router();

const users = require('./users/routes');
const questions = require('./questions/routes');
const answers = require('./answers/routes');

router.use('/users', users);
router.use('/questions', questions);
router.use('/answers', answers);

module.exports = router;
