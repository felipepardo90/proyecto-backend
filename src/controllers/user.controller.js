const controller = {};

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
  res.render("profile");
};

//! LOGOUT

controller.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    res.redirect("login");
  });
};

export default controller;
