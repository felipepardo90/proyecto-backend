const fs = require("fs");

class Messages {
  constructor(file) {
    this.file = file;
  }

  async saveMessage(object) {
    try {
      const messageToParse = await fs.promises.readFile(this.file, "utf-8");
      const messages = JSON.parse(messageToParse);

      object.id = messages.length + 1;
      messages.push(object);
      const updatedFile = JSON.stringify(messages, null, " ");
      fs.promises.writeFile(this.file, updatedFile);

      return messages;
    } catch (error) {
      console.error(`Se produjo un error en saveMessage:${error}`);
    }
  }

  async readMessages() {
    try {
      const messageToParse = await fs.promises.readFile(this.file, "utf-8");
      const messages = JSON.parse(messageToParse);
      return messages;
    } catch (error) {
      console.error(`Se produjo un error en readMessages:${error}`);
    }
  }
}

module.exports = Messages;
