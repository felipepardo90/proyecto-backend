import passport from "passport";
import { Strategy } from "passport-local";
import { DAOUsers } from "../daos/index.js";

import { Strategy as JWTStrategy } from "passport-jwt";
import { ExtractJwt as ExtractJWT } from "passport-jwt";

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
      done(null, userFound);
    }
  )
);


/**
 * 
 * Las opciones de la estrategia contemplarán dos formas de obtener el token para autenticar.
 * El método login de passport nos proporcionará un token que será devuelto luego de la autenticación.
 * Podremos verificar la autenticación guardando este token en la cabecera Auth como Bearer, o desde el front copiando en la query "secret_token"
 * El mètodo ExtractJWT es extraìdo desde jwt-passport y la verificaciòn se hace una vez recibido el token. Esta verificaciòn devolverà los datos del usuario al servidor
 * 
 * 
 * La autenticaciòn por esta adaptaciòn solo està en la ruta ("/profile") que serà la que muestre los datos del usuario loggeado.
 * 
 * 
 *  */
const options = {
  secretOrKey: "top_secret",
  jwtFromRequest: ExtractJWT.fromExtractors(
    [
      ExtractJWT.fromAuthHeaderAsBearerToken(),
      ExtractJWT.fromUrlQueryParameter("secret_token")
    ]
  )
}
const JWTverify = (payload, done) => {
  try {
    return done(null, payload.user);
  } catch (error) {
    done(error);
  }
}

// JWT Strategy
passport.use(
  new JWTStrategy(options, JWTverify)
)
