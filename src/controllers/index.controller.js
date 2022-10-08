const controller = {};

controller.index = (req, res) => {
  res.status(200).render("index");
};

module.exports = controller;
