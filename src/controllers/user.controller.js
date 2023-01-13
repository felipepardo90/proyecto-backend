//! DAOS /////////////////////////////////
import { DAOProducts, DAOCarts } from "../daos/index.js";
//! DAOS /////////////////////////////////
const controller = {};

const users = []; //TODO Temporal

//! REGISTER

controller.renderRegistryView = (req, res) => {
  res.json({ msg: "There should be a Register view here" }); //TODO Crear vista
};

controller.registerUser = (req, res) => {
  {
    const { username, password, email } = req.body;
    const user = users.find((u) => u.username == username);

    if (user) return res.send({ error: true, msg: "Username already exists" });

    users.push({ username, password, email });
    // res.redirect("/login");
    res.send({ error: false, msg: "¡User created succesfully!" });
  }
};

//! LOGIN

controller.renderLoginView = (req, res) => {
    res.send({msg:"There should be a Login view here"})
}

controller.loginUser = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(
      u => u.username == username && u.password == password
    );
  
    if (!user) return res.send({ error: true, msg: "User not found" });
    req.session.username = username;
    // res.redirect("/profile");
    res.send({ error: false, message: `Bienvenido ${req.session.username}` });
  }

export default controller;
