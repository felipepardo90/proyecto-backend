import passport from "passport";
import { Strategy } from "passport-local";
import { DAOUsers } from "../daos/index.js";

import { Strategy as JWTStrategy } from "passport-jwt";
import { ExtractJwt as ExtractJWT } from "passport-jwt";
import { generateToken } from "../utils/utils.js";
import { SECRET } from "./keys.js";

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await DAOUsers.findById(id);
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

      const userFound = await DAOUsers.findByEmail(email);
      if (userFound) {
        return done(
          null,
          false,
          req.flash("signup message", "Email already registered")
        );
      } else {
        const user = await DAOUsers.create({
          email,
          password: DAOUsers.encryptPass(password),
          username,
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
      const userFound = await DAOUsers.findByEmail(email);
      if (!userFound) {
        return done(null, false, req.flash("signin message", "User not found"));
      }
      if (!DAOUsers.validatePass(password, userFound.password)) {
        return done(null, false, req.flash("signin message", "Wrong Password"));
      }

      const body = {
        _id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      };

     const token = generateToken(body);
     console.log(token)

      done(null, userFound);
    }
  )
);

const options = {
  secretOrKey: SECRET,
  jwtFromRequest: ExtractJWT.fromExtractors([
    ExtractJWT.fromAuthHeaderAsBearerToken(),
    // ExtractJWT.fromUrlQueryParameter("auth_token"),
    // ExtractJWT.fromAuthHeaderWithScheme("Bearer"),
  ]),
};
async function JWTverify(payload, done) {
  try {
    return done(null, payload.user);
  } catch (error) {
    done(error);
  }
}

const strategy = new JWTStrategy(options, JWTverify);
passport.use(strategy);
