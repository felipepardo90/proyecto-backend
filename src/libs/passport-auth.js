import passport from "passport";
import { Strategy } from "passport-local";
import { DAOCarts, DAOUsers } from "../daos/index.js";

import { Strategy as JWTStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { generateToken } from "./utils.js";
import { SECRET } from "./keys.js";
import UserDTO from "../dto/DTO.user.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
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
      const { email, repeat_pass, phone, fullname } = req.body;



      const userFound = await DAOUsers.findByEmail(email);
      if (userFound) {
        return done(
          null,
          false,
          req.flash("signup message", "Email already registered")
        );
      } else if (password !== repeat_pass) {
        return done(
          null,
          false,
          req.flash("password message", "Passwords do not match"))
      } else {
        const newUser = await DAOUsers.create({
          fullname,
          email,
          phone,
          username,
          password: DAOUsers.encryptPass(password)
        });
        const newCart = await DAOCarts.newCart()

        const user = new UserDTO(newUser, newCart)

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

      generateToken(body);

      done(null, userFound);
    }
  )
);

const options = {
  secretOrKey: SECRET,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    ExtractJwt.fromUrlQueryParameter("auth_token"),
    ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
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
