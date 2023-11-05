const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const app = express();
const PORT = process.env.PORT || 3000;
const GITHUB_CLIENT_ID = '8e3fb8a3e6a9fd276f4c';
const GITHUB_CLIENT_SECRET = 'eda401925570dd5c2747ce9a04ad78999a1dc860';

app.use(cors());
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GitHubStrategy(
    {
      clientID: `8e3fb8a3e6a9fd276f4c`,
      clientSecret: `eda401925570dd5c2747ce9a04ad78999a1dc860`,
      callbackURL: `http://localhost:3000/`,
    },
    (accessToken, refreshToken, profile, done) => {
      // Save user data and access token in the database or session
      const user = {
        id: profile.id,
        username: profile.username,
        email: profile.email,
        // Add other user data as needed
      };
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/auth/github', passport.authenticate('github'));

app.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/profile');
  }
);

app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    // User is authenticated, you can render the UserProfile component here
    res.send('User is authenticated');
  } else {
    res.redirect('/');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

