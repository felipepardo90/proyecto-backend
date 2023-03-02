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
  successRedirect: `/profile?auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzZjNlNWM3MTU1N2EzNjhjZjM1MWMzMiIsInVzZXJuYW1lIjoiRmVsaXBlIiwiZW1haWwiOiJmZWxpcGVwYXJkbzkwQGhvdG1haWwuY29tIn0sImlhdCI6MTY3NzcyMTI2MH0.Uts8vuRhU8HUOrTiXzzFjdXdcno0PCLmbmTF9d-_iNk`,
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
