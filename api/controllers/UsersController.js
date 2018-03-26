var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var config = require('../../config/credentials');
let User = require('../models/user.js');
var gcal = require('google-calendar');
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackURL
},
  function (accessToken, refreshToken, profile, done) {
    console.log(profile)
    console.log(accessToken)
    User.findOne({ oauthID: profile.id }, function (err, user) {
      if (err) {
        console.log(err);
      }
      if (!err && user !== null) {
        user.token = accessToken;
        done(null, user);
      } else {
        user = new User({
          oauthID: profile.id,
          name: profile.displayName,
          email: profile.email,
          token: accessToken,
          created: Date.now()
        });
        user.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("saving user ...");
            done(null, user);
          }
        });
      }
    });
  }
));
module.exports = {
  checksession: (req, res) => {
    return res.json(req.session.passport)
  },
  addevent:(req,res)=>{
    var addEventBody = {
      'status':'confirmed',
      'summary': req.body.title,
      'description': req.session.passport.user.displayName ,
      'organizer': {
        'email': req.session.passport.user.email,
        'self': true
      },
      'start': {
        'dateTime': new Date(req.body.start),
      },
      'end': {
        'dateTime': new Date(req.body.end)
      }
  };
  var calendar = new gcal.GoogleCalendar(req.session.passport.user.token);
    calendar.events.insert(req.session.passport.user.email, addEventBody, function(err, response) {
        if(err) console.log(err);

        res.send(response);
    });
  },
  getevents: (req, res) => {
    var events = [];
    var date = new Date('2018-03-25');
   date.toISOString()
   console.log(date)
   
    var calendar = new gcal.GoogleCalendar(req.session.passport.user.token);
    calendar.events.list(req.session.passport.user.email, { 'timeMin': new Date().toISOString()}, function (err, theEvent) {
      
      for (var index in theEvent.items) {

        events.push({
          title: theEvent.items[index].summary,
          start: theEvent.items[index].start.dateTime,
          end: theEvent.items[index].end.dateTime
        })
      }
      return res.json(events)
    })
  },
  logout:(req,res)=>{
    req.session.passport=null
     res.json({message:'logout'})
  
 },
}

