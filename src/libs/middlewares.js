//? completedFields revisará si el input del formulario o la query recibe todos los parámetros solicitados // Método POST

export const MW = {};

MW.completedFields = (req, res, next) => {
  const { title, price, thumbnail, description, code, stock } = req.body;
  title && price && thumbnail && description && code && stock
    ? next()
    : res.status(300).send({ message: "Debe completar todos los campos" });
};

//? Permisos de administrador

MW.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

MW.isNotAuth = (req, res, next) => {
  req.isAuthenticated() || next();
};
