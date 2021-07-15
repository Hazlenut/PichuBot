module.exports = {
    name: 'leave',
    description: 'Leaves current VC',
    execute(msg) {
        if(msg.member.voice.channel) {
            return msg.member.voice.channel.leave();
        } else {
            return msg.channel.send('No current VC!');
        }
    },
};