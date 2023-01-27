import passport from "passport";

const controller = {};

//! REGISTER

controller.renderRegistryView = (req, res) => {
  res.render("register");
};

controller.signUpUser = passport.authenticate("signup", {
  successRedirect: "/login",
  failureRedirect: "/register",
  passReqToCallback: true,
});

//! LOGIN

controller.renderLoginView = (req, res) => {
  res.render("login");
};

controller.logInUser = passport.authenticate("login", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  passReqToCallback: true,
});

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
