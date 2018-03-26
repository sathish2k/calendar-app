let UsersController = require('../api/controllers/UsersController.js');
let EventsController = require('../api/controllers/EventsController.js');
let express = require('express');
let router = express.Router();
var passport = require('passport');

function Authenticated( req, res, next) {
    console.log(req.session.userId)
    if (req.session.userId) {
      next();
  } else {
     res.redirect("/login");
  }
  }
  router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email','https://www.googleapis.com/auth/calendar'] }));
  router.get('/user/googlecallback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
  router.post('/user/checksession',UsersController.checksession)
  router.post('/user/getevents',UsersController.getevents);
  router.post('/user/addevent',UsersController.addevent);

  router.post('/user/logout',UsersController.logout);
  module.exports = router;