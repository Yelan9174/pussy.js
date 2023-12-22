const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "uninstall",
    aliases: ["remove"],
    version: "1.0",
    author: "GoatAI by Liane",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "Uninstall a command",
      tl: "Tanggalin ang isang command"
    },
    longDescription: {
      en: "This command allows you to uninstall a command from the bot's /scripts/cmds folder.",
      tl: "Ang command na ito ay nagbibigay-daan sa iyo na tanggalin ang isang command mula sa /scripts/cmds folder ng bot."
    },
    category: "goatBot",
    guide: {
      en: "{p}uninstall ",
      tl: "{p}tanggalin "
    }
  },
  onStart: async function ({ event, args, api }) {
    const commandName = args[0];
    
    if (!commandName) {
      message.reply("Please specify the name of the command you want to uninstall.");
      return;
    }
    
    const filePath = path.join(__dirname, '..', '..', 'scripts', 'cmds', `${commandName}.js`);
    
    fs.access(filePath, fs.constants.F_OK, async (err) => {
      if (err) {
        message.reply(`The command '${commandName}' doesn't exist.`);
        return;
      }
      
      fs.unlink(filePath, (err) => {
        if (err) {
          message.reply(`An error occurred while uninstalling the command '${commandName}'.`);
          return;
        }
        
        message.reply(`The command '${commandName}' has been uninstalled successfully.`);
      });
    });
  }
}
