const express = require('express');
const passport = require('passport');
const router = express.Router();

const FRONT = process.env.FRONTEND_URL || 'http://localhost:5173';

// Google
router.get('/google', passport.authenticate('google', { scope: ['profile','email','openid'] }));
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: FRONT + '/login', session: true }),
  (req,res) => res.redirect(FRONT + '/')
);

// GitHub
router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: FRONT + '/login', session: true }),
  (req,res) => res.redirect(FRONT + '/')
);

// Facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: FRONT + '/login', session: true }),
  (req,res) => res.redirect(FRONT + '/')
);

// logout
router.get('/logout', (req,res) => {
  req.logout(() => {});
  res.clearCookie('connect.sid');
  res.redirect(FRONT + '/login');
});

module.exports = router;
