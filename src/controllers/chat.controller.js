
let controller = {};

controller.renderChat = async (req, res) => {
  res.render("chat");
};

controller.sendMessage = async (req, res) => {
  const { message } = req.body;
  const username = req.user.email;
};
// })

export default controller;
