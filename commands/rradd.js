const { MessageEmbed } = require("discord.js");

module.exports = {
    // format !rradd title,reaction role,reaction role
    name: 'rradd',
    description: 'Adds a reaction role block.',
    execute(msg, args) {
        const roles = args.split(' ');
        const embed = new MessageEmbed()
            .setTitle(roles[0])
        var i = 0;
        while (i++ < roles.length) {
            const newEmbed = new MessageEmbed()
                .set
        }
        
        msg.reply(embed);
    },
};