import express from 'express';
import passport from 'passport';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res, next) {
    const user = req.session.passport?.user;
    req.session.regenerate((err) => {
      if (err) return next(err);
      req.session.passport = { user };
      req.session.save((saveErr) => {
        if (saveErr) return next(saveErr);
        res.redirect('/');
      });
    });
  }
);

export default app;
