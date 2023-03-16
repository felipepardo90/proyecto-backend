import passport from "passport";
import { Strategy } from "passport-local";
import { DAOCarts, DAOUsers } from "../daos/index.js";

import { Strategy as JWTStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { generateToken } from "./utils.js";
import { SECRET } from "./keys.js";
import UserDTO from "../dto/DTO.user.js";
import sendMailEth from "./nodemailer.js";
import mongoose from "mongoose";
import User from "../models/Mongo Pers/User.js";

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


        //! COMPACTING USER INFO IN DTO/


        const newUser = new UserDTO({
          fullname,
          email,
          phone,
          username,
          role: "user",
          password: DAOUsers.encryptPass(password)
        })

        //! NEW USER/

        const user = await DAOUsers.create(newUser);

        console.log("user", user)

        //! NEW CART WHEN REGISTERING/


        const newCart = await DAOCarts.newCart(user._id)
        console.log("req user before", req.user)
        req.user = { ...req.user, current_cart: newCart._id }
        console.log("req user after", req.user)

        //! MESSAGE FOR NODEMAILER/
        const messageHTML = `
        <h1>NEW REGISTER</h1>
        <div>
        <h3>EMAIL: ${email}</h1>
        <h3>USERNAME: ${username}</h3>
        <h3>FULLNAME: ${fullname}</h3>
        <h6>Phone: ${phone}</h6>
        </div>`
        //! SENDING E-MAIL/
        sendMailEth(email, "New Register", messageHTML)
        //! RETURN USER ON REQ.USER/
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
        fullname: userFound.fullname,
        username: userFound.username,
        email: userFound.email,
        phone: userFound.phone
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
