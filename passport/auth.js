import passport from "passport";
import { Strategy } from "passport-local";
import { DAOUsers } from "../src/daos/index.js";

passport.serializeUser((userObj, done) => {
  done(null, userObj._id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id, done);
});

//! SIGNUP

passport.use(
  "signup",
  new Strategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      const { email } = req.body;
      await DAOUsers.getUserByUsername({ username }, (err, user) => {
        console.log(user);
        console.log(err);
        if (user) return done(null, false);

        DAOUsers.createUser(
          { username, password: hasPassword(password), email },
          (err, user) => {
            if (err) return done(err);
            return done(null, user);
          }
        );
      });
    }
  )
);

//! LOGIN

passport.use(
  "login",
  new Strategy({}, async (username, password, done) => {
    await DAOUsers.getUserByUsername({ username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      if (!validatePass(password, user.password)) return done(null, false);
      return done(null, user);
    });
  })
);
