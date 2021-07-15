const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'coin',
    description: 'Flips a coin',
    execute(msg) {
        const value = Math.floor(Math.random() * 2);
        var embed;
        if(value == 1) {
            embed = new MessageEmbed()
                .setTitle("COIN FLIP: ")
                .setDescription('HEADS!!!')
                .setImage('https://i.imgur.com/j3hPOAm.png')
        } else {
            embed = new MessageEmbed()
                .setTitle("COIN FLIP: ")
                .setDescription('TAILS!!!')
                .setImage('https://i.imgur.com/WV5u5wi.jpg')
        }
        msg.reply(embed);
    },
};