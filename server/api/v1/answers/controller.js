const { answer = {}, references = {} } = require('./model.js');
const referencesNames = Object.getOwnPropertyNames(references);

exports.id = (req, res, next, id) => {
  const authorReference = referencesNames.join(' ');

  answer
    .find({ question: id })
    .populate(authorReference)
    .exec()
    .then((data) => {
      req.answer = data;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.create = (req, res, next) => {
  const { body = {}, decoded = '' } = req;
  const { _id = null } = decoded;
  body.user = _id;
  const newAnswer = new answer(body);
  newAnswer
    .save()
    .then((data) => {
      res.json(data);
      next();
    })
    .catch((exception) => {
      next(new Error(exception));
    });
};

exports.read = (req, res, next) => {
  const { answer } = req;
  res.json({
    success: true,
    item: answer,
  });
};
