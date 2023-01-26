# Proyecto Backend - Primera entrega

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
    "dotenv": "^16.0.3",
    "ejs": "^3.1.8",
    "express": "^4.18.1",
    "express-session": "^1.17.3",
    "mongoose": "^6.7.0",
    "multer": "^1.4.5-lts.1",
    "passport": "^0.6.0",
    "passport-local": "^1.0.0"
  },
```

## Instalar e iniciar proyecto
```
npm init

npm run dev
```

### Depuración 

```json
"scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
```

Entrega sin vistas. Se ha probado los endpoints con Thunder Client