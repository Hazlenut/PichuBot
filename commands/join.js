module.exports = {
    name: 'join',
    description: 'Joins current VC',
    execute(msg) {
        if(msg.member.voice.channel) {
            return msg.member.voice.channel.join();
        } else {
            return msg.channel.send('No current VC!');
        }
    },
};