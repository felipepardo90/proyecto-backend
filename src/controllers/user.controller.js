//! DAOS /////////////////////////////////
// import { DAOUsers } from "../daos/index.js";
//! DAOS /////////////////////////////////
const controller = {};

const users = []; //TODO Temporal

//! REGISTER

controller.renderRegistryView = (req, res) => {
  res.render("register");
};

//! LOGIN

controller.renderLoginView = (req, res) => {
  res.render("login");
};

//! PROFILE

controller.renderProfileView = (req, res) => {
  res.render("profile")
};

//! LOGOUT

controller.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    //TODO devolver a LOGIN
    res.redirect("login");
  });
};

export default controller;
