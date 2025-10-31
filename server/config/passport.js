const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

module.exports = function(passport) {
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const u = await User.findById(id);
      done(null, u);
    } catch (err) { done(err); }
  });

  //Google
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ oauthId: profile.id, provider: 'google' });
      if (!user) {
        user = await User.create({
          name: profile.displayName,
          email: profile.emails?.[0]?.value || "",
          oauthId: profile.id,
          provider: 'google',
          avatar: profile.photos?.[0]?.value?.replace('=s96-c', '') || ""
        });
      }
      done(null, user);
    } catch (err) { done(err); }
  }));

  // GitHub
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let email = profile.emails?.[0]?.value || "";
      let user = await User.findOne({ oauthId: profile.id, provider: 'github' });
      if (!user) {
        user = await User.create({
          name: profile.displayName || profile.username || "GitHub User",
          email,
          oauthId: profile.id,
          provider: 'github',
          avatar: profile.photos?.[0]?.value || "" 
        });
      }
      done(null, user);
    } catch (err) { done(err); }
  }));

  // Facebook
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'photos'],
  }, async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ oauthId: profile.id, provider: 'facebook' });
          if (!user) {
            user = await User.create({
              name: profile.displayName || 'Facebook User',
              oauthId: profile.id,
              provider: 'facebook',
              avatar: profile.photos?.[0]?.value || '',
            });
          }
          done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
};