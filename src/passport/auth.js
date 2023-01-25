import passport from "passport";
import { Strategy } from "passport-local";
import { DAOUsers } from "../daos/index.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = DAOUsers.findById(id);
  done(null, user);
});

//! SIGNUP

passport.use(
  "signup",
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { email } = req.body;

      const userFound = await DAOUsers.findOne(email);
      if (userFound) {
        return done(
          null,
          false,
          req.flash("signup message", "Already registered")
        );
      } else {
        const user = await DAOUsers.create({
          username,
          password: await DAOUsers.encryptPass(password),
          email,
        });
        done(null, user);
      }
    }
  )
);

//! SIGNIN

passport.use(
  "login",
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const userFound = await DAOUsers.findOne(email);
      if (!userFound) {
        return done(null, false, req.flash("signin message", "User not found"));
      }
      if (!userFound.comparePass(password)) {
        return done(
          null,
          false,
          req.flash("signin message", "Incorrect Password")
        );
      }
      done(null, userFound);
    }
  )
);
