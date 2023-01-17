//! DAOS /////////////////////////////////
// import { DAOProducts, DAOCarts } from "../daos/index.js";
//! DAOS /////////////////////////////////
const controller = {};

const users = []; //TODO Temporal

//! REGISTER

controller.renderRegistryView = (req, res) => {
  // res.json({ msg: "There should be a Register view here" });
  res.render("register");
};

controller.registerUser = (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password, "PRUEBA")
  const user = users.find((u) => u.username == username);
  if (user) return res.send({ error: true, msg: "Username already exists" });
  
  users.push({ username, password });
  // console.log(users, "users register")
  console.log("¡User created succesfully!");
  res.redirect("/login");
};

//! LOGIN

controller.renderLoginView = (req, res) => {
  res.render("login");
};

controller.loginUser = (req, res) => {
  console.log(users, "users login")
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username == username && u.password == password
  );

  if (!user)
    return res.send({
      error: true,
      msg: "Username and/or password are incorrect",
    });
  // req.session.username = username;
  console.log(user)
  res.status(200).render("index", { user: user });
  // res.send({ error: false, message: `Bienvenido ${req.session.username}` });
};

//! PROFILE

controller.renderProfileView = (req, res) => {
  const user = users.find(({ username }) => username == req.session.username);
  console.log(user);
  res.send({ error: false, data: user });
};

//! LOGOUT

controller.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    // res.send({ error: false, msg: "¡Bye!" });
    //TODO devolver a LOGIN
    res.redirect("login");
  });
};

export default controller;
