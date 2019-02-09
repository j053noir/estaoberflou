const { question = {}, fields = {}, references = {} } = require('./model.js');
const { paginationParseParams } = require.main.require('./server/utils/');
const { sortParseParams, sortCompactToStr } = require.main.require('./server/utils');

const referencesNames = Object.getOwnPropertyNames(references);

exports.id = (req, res, next, id) => {
  const authorReference = referencesNames.join(' ');

  question
    .findById(id)
    .populate(authorReference)
    .exec()
    .then((data) => {
      req.question = data;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.all = (req, res, next) => {
  const { query = {} } = req;
  const { limit, page, skip } = paginationParseParams(query);
  const { sortBy, direction } = sortParseParams(query, fields);
  const populate = referencesNames.join(' ');

  const all = question.find()
    .sort(sortCompactToStr(sortBy, direction))
    .limit(limit)
    .skip(skip)
    .populate(populate);
  const count = question.countDocuments();

  Promise.all([all.exec(), count.exec()])
    .then((data) => {
      const [docs, total] = data;
      const pages = Math.ceil(total / limit);

      res.json({
        success: true,
        items: docs,
        meta: {
          limit,
          skip,
          total,
          page,
          pages,
          sortBy,
          direction,
        },
      });
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.create = (req, res, next) => {
  const { body = {} } = req;
  const newQuestion = new question(body);
  newQuestion
    .save()
    .then((question) => {
      res.json(question);
      next();
    })
    .catch((exception) => {
      next(new Error(exception));
    });
};

exports.read = (req, res, next) => {
  const { question } = req;
  res.json({
    success: true,
    item: question,
  });
};

exports.update = (req, res, next) => {
  const { question, body } = req;

  Object.assign(question, body);

  question
    .save()
    .then((updated) => {
      res.json({
        success: true,
        item: updated,
      });
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.delete = (req, res, next) => {
  const { question } = req;

  question
    .remove()
    .then((removed) => {
      res.json({
        success: true,
        item: removed,
      });
    })
    .catch((err) => {
      next(new Error(err));
    });
};
