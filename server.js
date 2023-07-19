/*const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;*/
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import SteamStrategy from 'passport-steam';

const app = express();

app.use(session({
    secret: 'your secret here',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new SteamStrategy({
    returnURL: 'http://localhost:5174/auth/steam/return',
    realm: 'http://localhost:5174',
    apiKey: 'apikey'  // You will need to get this from the Steam API
  },
  function(identifier, profile, done) {
    process.nextTick(function () {
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

  app.get('/auth/steam/return', (req, res, next) => {
    const openid = new OpenIDStrategy({
        // The steam openid provider url
        providerURL: 'http://steamcommunity.com/openid',
        stateless: true,
        returnURL: returnURL,
        realm: realm
    }, async (identifier, done) => {
        // Assuming that 'db' is your database instance
        let user = await db.findUserByIdentifier(identifier);

        // If the user does not exist, create a new user
        if (!user) {
            user = await db.createUser(identifier);
        }

        done(null, user);
    });

    openid.authenticate(req, res, next);
}, (req, res) => {
    req.session.user = req.user;
    res.redirect('https://localhost:5173'); // Or wherever you want to redirect the user after they have logged in
});


app.listen(5174, () => {
    console.log('Server is running on http://localhost:5174');
});
