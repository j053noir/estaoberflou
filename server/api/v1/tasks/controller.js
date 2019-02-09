const { ModelTask = {}, fields = {}, references = {} } = require('./model.js');
const { paginationParseParams } = require.main.require('./server/utils/');
const { sortParseParams, sortCompactToStr } = require.main.require('./server/utils');

const referencesNames = Object.getOwnPropertyNames(references);

exports.id = (req, res, next, id) => {
  const authorReference = referencesNames.join(' ');

  ModelTask
    .findById(id)
    .populate(authorReference)
    .exec()
    .then((task) => {
      req.task = task;
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

  const all = ModelTask.find()
    .sort(sortCompactToStr(sortBy, direction))
    .limit(limit)
    .skip(skip)
    .populate(populate);
  const count = ModelTask.countDocuments();

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
  const newTask = new ModelTask(body);
  newTask
    .save()
    .then((task) => {
      res.json(task);
      next();
    })
    .catch((exception) => {
      next(new Error(exception));
    });
};

exports.read = (req, res, next) => {
  const { task } = req;
  res.json({
    success: true,
    item: task,
  });
};

exports.update = (req, res, next) => {
  const { task, body } = req;

  Object.assign(task, body);

  task
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
  const { task } = req;

  task
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
