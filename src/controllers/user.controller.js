import passport from "passport";
import JWT from "jsonwebtoken";

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

controller.logInUser = async (req, res, next) => {
  passport.authenticate(
    "login",
    {
      failureRedirect: "/login",
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
          const body = {
            _id: user._id,
            username: user.username,
            email: user.email,
          };

          const token = JWT.sign({ user: body }, "top_secret");
          return res.status(200).send({ token: token })
          // return res.status(200).render("profile");
        });
      } catch (e) {
        return next(e);
      }
    }
  )(req, res, next);
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
