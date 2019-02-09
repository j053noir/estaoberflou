const ModelUser = require('./model');


exports.read = (req, res, next) => {
  const { email = '' } = req.params;
  // res.json(email);
  ModelUser.findOne({ email })
    .exec()
    .then((doc) => {
      if (!doc) {
        const message = 'Not found';

        next({
          message,
          statusCode: 404,
          type: 'warn',
        });
      } else {
        req.doc = doc;
        res.json(doc);
        next();
      }
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.all = (req, res, next) => {
  ModelUser
    .find()
    .exec()
    .then((all) => {
      if (!all) {
        const message = 'not found';
        next({
          message,
          statusCode: 404,
          type: 'warn',
        });
      } else {
        res.json({
          success: true,
          items: all,
        });
        next();
      }
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.crear = (req, res, next) => {
  const { body = {} } = req;
  const { email = '' } = body;
  const newUser = new ModelUser(body);

  // find user by email
  ModelUser
    .findOne({ email })
    .exec()
    .then((existe) => {
      if (existe) {
        const message = 'User already exists';
        next({
          message,
          statuCode: 404,
          type: 'warn',
        });
      } else {
        newUser
          .save()
          .then((newDoc) => {
            res.json(newDoc);
            next();
          })
          .catch((exception) => {
            next(new Error(exception));
          });
      }
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.update = (req, res, next) => {
  const { body = {} } = req;
  const { email = '' } = req.params;

  ModelUser.findOne({ email })
    .exec()
    .then((existUser) => {
      if (!existUser) {
        const message = 'Not found';
        next({
          message,
          statuCode: 404,
          type: 'warn',
        });
      } else {
        // entonces actualizamos el documento
        // Object.assign(doc, body);
        // res.json("Nombre: "+body.nombre);
        existUser.nombre = body.nombre;
        existUser.apellido = body.apellido;
        existUser
          .save()
          .then((updated) => {
            res.json(updated);
          })
          .catch((err) => {
            next(new Error(err));
          });
      }
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.activo = (req, res, next) => {
  const { activo = '', email = '' } = req.params;

  if (activo !== '0' && activo !== '1') {
    const message = 'Parametro no valido';
    next({
      message,
      statuCode: 400,
      type: 'warn',
    });
  }
  ModelUser.findOne({ email })
    .exec()
    .then((existUser) => {
      if (!existUser) {
        const message = 'Not found';
        next({
          message,
          statuCode: 404,
          type: 'warn',
        });
      } else {
        // entonces actualizamos cambiamos el attr activo        
        existUser.activo = activo;
        existUser
          .save()
          .then((updated) => {
            res.json(updated);
          })
          .catch((err) => {
            next(new Error(err));
          });
      }
    })
    .catch((err) => {
      next(new Error(err));
    });
};
