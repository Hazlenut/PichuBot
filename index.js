require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const { MongoClient } = require('mongodb');
const bot = new Discord.Client();

const prefix = '!';

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    if (msg.author.bot) return;
    if (msg.content.toLowerCase().includes("nut")) {
        var nutCount;

        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/mydb";

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("users").findOne({user: msg.author.id}, function(err, res) {
                if (err) throw err;
                if(res) {
                    dbo.collection("users").updateOne(
                        { user: msg.author.id },
                        { $inc: {nut: 1} }
                    );
                    var query = {user: msg.author.id};
                    dbo.collection("users").find(query).toArray(function(err, res) {
                        if (err) throw err;
                        nutCount = res[0].nut;
                        msg.channel.send(`${msg.author.username} has nutted ${nutCount} times!`);
                        db.close();
                    })
                } else {
                    var author = msg.author.id;
                    var count = 1;
                    var myobj = { user: author, nut: count };
                    dbo.collection("users").insertOne(myobj, function(err, res) {
                        if (err) throw err;
                        console.log("1 nut added!");
                    })
                    var query = {user: msg.author.id};
                    dbo.collection("users").find(query).toArray(function(err, res) {
                        if (err) throw err;
                        nutCount = res[0].nut;
                        msg.channel.send(`${msg.author.username} has nutted ${nutCount} times!`);
                        db.close();
                    })
                };
            });
            
        });
        
    }
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;


    const args = msg.content.slice(prefix.length).trim();
    const command = args.split(' ').shift().toLowerCase();

    if(!bot.commands.has(command)) return;

    try {
        bot.commands.get(command).execute(msg, args);
    } catch (err) {
        console.error(err);
        msg.reply("error");
    }
});