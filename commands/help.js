const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let ncommands = 0;
  bot.commands.forEach(command =>{ncommands++;});

  if (ncommands <= 26) {
    let helpembed = new Discord.RichEmbed()
    .setDescription("Alors comme ça on a besoin d'aide ? Grosse flemme de faire du cas par cas donc j'te lache tous les trucs que tu peux me demander d'un coup :")
    .setColor("#A4244E");
    bot.commands.forEach(command =>{
        helpembed.addField(`__${command.help.name}:__ ${command.help.description}`, `\`${command.help.examples}\``);
    });
  
    try{
      message.author.send(helpembed);
      message.reply("bébé ? t'as reçu ma dick pic en MP? Allez va donc voir ;)");
    }catch(e)
    {
      message.reply("Eh maggle, j'peux pas t'envoyer de MP, on fait comment pour ta PLS là ?");
    }
  }
  else
  {
    let helpmsg;
    helpmsg = "Alors comme ça on a besoin d'aide ? Grosse flemme de faire du cas par cas donc j'te lache tous les trucs que tu peux me demander d'un coup :\n";
    bot.commands.forEach(command =>{
        helpmsg += `__${command.help.name}:__ ${command.help.description}\nUsage :\`${command.help.examples}\`\n`;
    });
    try{
      message.author.send(helpmsg);
      message.reply("bébé ? t'as reçu ma dick pic en MP? Allez va donc voir ;)");
    }catch(e)
    {
      message.reply("Eh maggle, j'peux pas t'envoyer de MP, on fait comment pour ta PLS là ?");
    }
  }
}

module.exports.help = {
  name: 'pls',
  description: 'Pour les cas de PLS ultime, affiche l\'aide',
  examples: 'stp pls'
}