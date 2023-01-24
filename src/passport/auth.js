import passport from "passport";
// import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import { DAOUsers } from "../daos/index.js";

// const encryptPass = (password) => {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// };

// const validatePass = (password, hashedPassword) => {
//   return bcrypt.compareSync(password, hashedPassword);
// };

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  Users.findById(_id, done);
});

//! SIGNUP

passport.use(
  "signup",
  new Strategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      console.log("passport AUTH", username, "PASS", password, ">>>>>>");
      const { email } = req.body;
      await DAOUsers.findOne({ username }, (err, user) => {
        console.log(err);
        if (user) return done(null, false);

        DAOUsers.create(
          { username, password: encryptPass(password), email },
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
    await DAOUsers.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      if (!validatePass(password, user.password)) return done(null, false);
      return done(null, user);
    });
  })
);
