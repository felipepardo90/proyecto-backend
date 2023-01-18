//! DAOS /////////////////////////////////
import { DAOUsers } from "../daos";
//! DAOS /////////////////////////////////
const controller = {};

const users = []; //TODO Temporal

//! REGISTER

controller.renderRegistryView = (req, res) => {
  res.render("register");
};

controller.registerUser = (req, res) => {
  // console.log("REGISTER>>>>", req.body, "<<<<REGISTER");
  const { username, password } = req.body; //TODO fix on form
  const user = users.find((u) => u.username == username);
  if (user) return res.send({ error: true, msg: "Username already exists" });

  users.push({ username, password });
  res.redirect("/login");
};

//! LOGIN

controller.renderLoginView = (req, res) => {
  res.render("login");
};

controller.loginUser = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username == username && u.password == password
  );

  if (!user)
    return res.send({
      error: true,
      msg: "Username/password are incorrect",
    });
  res.status(200).render("index", { user: user });
};

//! PROFILE

controller.renderProfileView = (req, res) => {
  const user = users.find(({ username }) => username == req.session.username);
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
