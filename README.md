# Proyecto Backend - Entrega Final

## Dependencias

### Desarrollo

```json
"devDependencies": {
    "morgan": "^1.10.0",
    "nodemon": "^2.0.20"
  }
```

### Dependencias

```json
"dependencies": {
    "bcrypt": "^5.1.0",
    "body-parser": "^1.20.1",
    "connect-flash": "^0.1.1",
    "connect-mongo": "^4.6.0",
    "dotenv": "^16.0.3",
    "ejs": "^3.1.8",
    "express": "^4.18.1",
    "express-session": "^1.17.3",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^6.7.0",
    "passport": "^0.6.0",
    "passport-jwt": "^4.0.1",
    "passport-local": "^1.0.0",
    "socket.io": "^4.6.1"
  },
```

## Instalar e iniciar proyecto
```
npm init

npm run dev (se iniciará el proyecto en modo DESARROLLADOR en un puerto por default 8000) ||
NODE_ENV=prod (se iniciará el proyecto en modo PRODUCCIón en un puerto definido desde un archivo configurable)
```

### Depuración 

```json
"scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
```



### VISTAS && DATABASE - ejs && mongodb

La entrega se hace con vistas en /products, /login, /register, /profile, /chat y /404. Para todas las vistas se implementó el motor EJS con SASS simple para dar estilo.
El carrito será entregado como API con todas las funciones CRUD implementando lógicas y métodos de MONGODB. Se puede probar desde POSTMAN o THUNDER CLIENT desde la ruta /api/cart --

La base de datos será de persistencia en MONGODB, en la nube Atlas para el modo PRODUCCIÓN, y desde localhost:27017 para el modo DESARROLLADOR

```javascript
import { MONGODB_URI } from "./keys.js";


export default {
  mongodb: {
    url: MONGODB_URI,
    options: {
      serverSelectionTimeoutMS: 10000,
    },
  },
};
```

### KEYS  - dotenv

Se proporciona un archivo configurable .env que será desglosado desde un archivo keys.js donde con un switch se podrá seleccionar desde la consola si se usará el modo DEV o PROD. 
Para poder hacer uso del archivo .env (ignorado) se utilizó la librería "dotenv" y su método config()

```javascript
import * as dotenv from "dotenv";
dotenv.config();

export let PORT;
export let MONGODB_URI
export let MONGO_SESSION
export let ENV
export let SECRET = process.env.SECRET;
switch (process.env.NODE_ENV) {
  case "prod":
    PORT = process.env.PORT;
    MONGODB_URI = process.env.MONGODB_URI
    MONGO_SESSION = process.env.MONGO_SESSION
    ENV = process.env.NODE_ENV
    break;

  default:
    PORT = 8000;
    MONGODB_URI = "mongodb://localhost:27017/ecommerce"
    MONGO_SESSION = "mongodb://localhost:27017/sessions"
    ENV = "dev"
    break;
}

```

### AUIHENTICATION  - passport, jwebtoken, passport-jwt

Se implementó una estrategia de autenticación y registro con las librerías passport y passport-jwt, además de contar con el método sign de la librería jsonwebtoken. Se configuró un archivo passport.auth.js en donde se definen las estrategias "login" y "signup", además de una estrategía de verificación (JWTStrategy) que puede ser probada desde THUNDER CLIENT, en donde se proporcionan tres modos de chequear.

```javascript
const options = {
  secretOrKey: SECRET,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    ExtractJwt.fromUrlQueryParameter("auth_token"),
    ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
  ]),
};
```

#### Register

La estrategía de registro "signup" podrá tomar los valores desde el método POST en donde antes de registrarse, verificará que ingresé dos veces la contraseña, y también chequeará que el email no esté registrado ya en la base de datos

```javascript
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
        const user = await DAOUsers.create({
          fullname,
          email,
          phone,
          username,
          password: DAOUsers.encryptPass(password)
        });
        await DAOCarts.newCart(user._id)
        done(null, user);
      }
    }
  )
);
```

#### Login

Desde el método login se verificará que el usuario esté registrado en la base de datos (se toma como parámetro el email), y además chequeará que la contraseña sea la correcta. Una vez que esté verificado, se generará un token con los datos del usuario para que se pueda verificar la autenticación. Además, se creará automáticamente un carrito para el usuario desde el momento en que se registra en la base de datos.

```javascript
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
```

Ambas estrategias cuentan con mensajes enviados a las vistas desde la librería "flash"

### ARQUITECTURA

Se implementó un diseño MVC para el desarrollo del proyecto. Cada ruta cuenta con su controlador y sus modelos definidos.

### Faltó implementar

Nodemailer, socket (funcionaba desde el front pero al pasar al servidor no hubo caso), vista para el carrito, órdenes, deploy