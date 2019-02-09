const router = require('express').Router();

const tasks = require('./tasks/routes');
const users = require('./users/routes');
const questions = require('./questions/routes');

router.use('/tasks', tasks);
router.use('/users', users);
router.use('/questions', questions);

module.exports = router;
