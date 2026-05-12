import express from 'express';
import passport from 'passport';

const app = express();

app.use(express.urlencoded({ extended: true }));

// Noncompliant: missing req.session.regenerate() after login
app.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res) {
    // Noncompliant - no session.regenerate after login
    res.redirect('/');
  }
);

export default app;
