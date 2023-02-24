import passport from "passport";
import JWT from "jsonwebtoken";

const controller = {};

//! REGISTER

controller.renderRegistryView = (req, res) => {
  res.render("register");
};

controller.signUpUser = (req, res, next) => {
  passport.authenticate(
    "signup",
    {
      successRedirect: "/login",
      failureRedirect: "/register",
      passReqToCallback: true,
    },
    async (err, user, info) => {
      try {
        if (err || !user) {
          console.log(err);
          const error = new Error("new Error");
          return next(error);
        }

        req.login(user, async (err) => {
          if (err) return next(err);
          const body = { _id: user._id, email: user.email };

          const token = JWT.sign({ user: body }, "top_secret");
          return res.json({ token });
        });
      } catch (e) {
        return next(e);
      }
    }
  );
};
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
