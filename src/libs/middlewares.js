//? completedFields revisará si el input del formulario o la query recibe todos los parámetros solicitados // Método POST

export const MW = {};

MW.completedFields = (req, res, next) => {
  const { title, price, thumbnail, description, code, stock } = req.body;
  title && price && thumbnail && description && code && stock
    ? next()
    : res.status(300).send({ message: "Debe completar todos los campos" });
};

//? Permisos de administrador

//TODO implementar otros roles

MW.adminAuth = (permissions) => {
  return (req, res, next) => {
    permissions === true
      ? next()
      : res
          .status(401)
          .json({ error: -1, description: "unauthorized permission" });
  };
};
