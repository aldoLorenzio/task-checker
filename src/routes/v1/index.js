const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const partRoute = require('./part.route');
const subjectRoute = require('./subject.route');
const submitTaskRoute = require('./submitTask.route');
const checkSubmitTaskRoute = require('./checkSubmitTask.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/part',
    route: partRoute,
  },
  {
    path: '/subject',
    route: subjectRoute,
  },
  {
    path: '/submitTask',
    route: submitTaskRoute,
  },
  {
    path: '/checkSubmitTask',
    route: checkSubmitTaskRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
