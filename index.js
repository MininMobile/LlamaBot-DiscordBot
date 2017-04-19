/* Llama Bot - Discord Bot by MinBoi (Minin)
Requires NODE.JS v7+, OPUS & FFMPEG BINARIES */

const discord = require('discord.js');
const bot = new discord.Client();

const settings = require('./options');
const token = settings.token();
const ownerID = settings.owner();
const username = settings.username();

// VARIABLES
const prefix = '$';
const altPrefix = 'llamabot-';
var customPrefix = 'aaa-';
var discordBotsMembers = 0;
var recentlyWelcomedUser
var laRole;
var msg;

// MUSIC
var music =
['Abstract - Neverland (ft. Ruth B) (Prod. Blulake)',
'Axel Thesleff - Bad Karma',
'Bag Raiders - Shooting Stars',
'Marina & The Diamonds - Primadonna (WorldCAT Remix)',
'Nick Talos vs. Two Feet - Go Fuck Yourself']

// 8BALL
var eballs =
['Maybe...',
'Nope!',
"Don't count on it",
'Probably...',
'Without a doubt.',
'Go to Yahoo Answers lol.',
'Go search google lol.',
'Definitely!'];

// TOXIC
var insults =
['Slob on my nob.',
'Go fuck yourself.',
"If you have a son, he'll be a son of a bitch.",
'Kill Self.',
'Consider suicide.',
'Hissssss.',
':middle_finger:',
'Suck my Dick.',
'If you get a reason to live, tell me.',
'Need an insult? How about your mom.',
'Relocate your arse out of here.'];

// MEMES
var memes =
['https://murpe.000webhostapp.com/memes/1.png',
'https://murpe.000webhostapp.com/memes/2.jpg',
'https://murpe.000webhostapp.com/memes/3.jpg',
'https://murpe.000webhostapp.com/memes/4.png',
'https://murpe.000webhostapp.com/memes/5.png',
'https://murpe.000webhostapp.com/memes/6.png',
'https://murpe.000webhostapp.com/memes/7.jpg',
'https://murpe.000webhostapp.com/memes/8.jpg',
'https://murpe.000webhostapp.com/memes/9.jpg',
'https://murpe.000webhostapp.com/memes/10.png',
'https://murpe.000webhostapp.com/memes/11.jpg',
'https://murpe.000webhostapp.com/memes/12.jpg',
'https://murpe.000webhostapp.com/memes/13.png',
'S̷̨̧̠̦͓̞̩̲͐̾̇̊̆͗̌̍́̑̏ͅͅU̷̱̓̌̀̊̇͐͂͘B̶̲̞̬̼̏͋͊̒̈́̂̆͆̉S̵̱̯͖̲͖̭̯͎̲̰̦̈́͑̒͜ͅC̵̜͉̞̬̮̪̅̾̿́͒R̸̥̞̰̙̱̖̜̦̰͔̦̈́͋̅̽͋͛͝I̷̡̡̨͍͈̱̩̭͒̓͋̊̓̾͒͜B̴̨̨̲̞̫̙͍͖̜̮̰͇̹̃̅̆̇̌̋͘ͅE̴̢̧͉̥̟͎̲̫̯̺̜͚̊͗̾̈̐̍̍̑̐ ̴̺͍͇̥̳̙̓̆̿͊͝T̴̢̙̻̞̩̟̤͂̃͑̋͑̍̚͘Ó̷̡̭͎̻͈̘͍̙͈ ̸̢̯̘͕̻̹̤͗͒́̌͌Ă̴̡̧͔̪̲̹͖̯̯̜̞̒̌̈́͐͛͊͝W̸͖̬̘̣̌̌̿͒͂̓̀͗̉͘̕͠͝E̸̛͍̽̿̑̄̈́̂͌̕̚̕͠͝S̶̢̢̲̯̳̦̿̒̈̓̽͘͠Ǒ̴̡̢͉͕̭̻̰̲̬̦̣̦̔͊͊͌̔͂̀͌̚̚͠ͅM̴͇͎̞̮͖̰̳̙̜̳͈̖̅̏̈́̓͑͐́̀̔̕͠͝E̷̛̗͎͙̗͉̳͍͇͖̺͐͌͗̑͗͗̍̀̕͜͝ ̵̢̈́̒͋͊̊̆̎̑̈́̔̓̚G̵̢̛̗̥̟̖̳̯͐̓̃̀̅̊̅̆͋̒̐̓͌A̴̧͖̖̭͉̋͊̇̆̑̕͝͠M̵̬̎̓̈́Ë̵̛̼̦̺̱̝̪͙͚̮́͋̍́̌̅̽͌͆̒͝Ṣ̸̨̥̙̗͚̠̿͝T̷̯̦̞̩̀̔̿́̊̀͘͝V̵̯͍͙̔̐̌͑͝']; // SUBSCRIBE TO AWESOMEGAMES TV


function commandIs(str, msg){
    return msg.content.toLowerCase().startsWith(prefix + str) || msg.content.toLowerCase().startsWith(altPrefix + str) || msg.content.toLowerCase().startsWith(customPrefix + str);
}

function random(minimum, maximum) {
    var random = Math.floor(Math.random() * maximum) + minimum;
    return random;
}

bot.on('ready', () => {
    console.log('Bot is Connected.');
    bot.user.setGame('Type $help');
});

bot.on('disconnect', () => {
    console.log('Bot has Disconnected.');
});

bot.on('reconnecting', () => {
    console.log('Bot is Reconnecting.');
});

bot.on('guildCreate', guild => {
    if (guild.channels === null) return
    console.log(`Llama Bot joined ${guild.name} owned by ${guild.owner.user.username}`);
    if (guild.owner.user.id == '274211819902730240') {guild.leave();}

    if (guild.memberCount > 100) return
    guild.owner.user.sendMessage('Thanks for adding Llama Bot to your server!' +
    '\n\n Type `$help` to get started.' +
    '\n Make a role called `llamaAdmin` if you want to use admin commands.' +
    '\n\n Enjoy! :)');
});

bot.on('guildMemberAdd', member => {
    if (member.guild.memberCount > 100) return
    if (member.guild.channels.find("name", "general") === null) return
    member.guild.channels.find("name", "general").sendMessage(`Welcome ${member.user} to ` + member.guild.name + '!');
    recentlyWelcomedUser = member.user.username;
});

bot.on('message', (message) => {
    if (message.channel.type == 'dm' || message.channel.type != 'text') { if (message.author.username != username) {console.log(message.author.username + ' TRIED TO EXECUTE A COMMAND IN DIRECT MESSAGE'); return}} else {if (message.guild.owner.user.id == '274211819902730240') {message.guild.leave();} /* le bin removal system*/}

    if (message.author.username != username) {
        if (message.content.startsWith(prefix) || message.content.startsWith(altPrefix) || message.content.startsWith(customPrefix)) {
            console.log(message.author.username + " COMMANDED " + message + " IN GUILD " + message.guild);
        } else {
            if (message.guild.memberCount < 100) {
                console.log(message.author.username + " WROTE " + message + " IN GUILD " + message.guild);
        } else {
            if (message.guild.memberCount < 1000) {
                console.log('Message recieved in guild ' + message.guild + ' (' + message.guild.memberCount + ' Members)');
            } }
        } } else {
            if (!message.content.startsWith('Welcome')) {
                console.log('Bot replied');
        } else {
            console.log('Bot has Welcomed ' + recentlyWelcomedUser);
        }
    }
    if (message.author.bot) return;
    var args = message.content.split(/[ ]+/);

    // TEST COMMANDS
    if (commandIs('ping', message)) {
        message.channel.sendMessage('Pong');
    }

    if (commandIs('ding', message)) {
        message.guild.channels.find("name", "general").sendMessage('Hello World!');
    }

    if (commandIs('tst', message)) {
        message.channel.sendMessage('Hello World!');
        message.channel.sendEmbed({ color: 3447003, description: "Hello World!" });
    }

    // SAY COMMANDS
    if (commandIs('say', message)) {
        var words = '';
        for (var i = 0; i != args.length-1; i++) {
            words = words + ' ' + args[i + 1];
        }
        message.channel.sendMessage(words);
    }
    if (commandIs('embed', message)) {
        var words = '';
        for (var i = 0; i != args.length-1; i++) {
            words = words + ' ' + args[i + 1];
        }
        message.channel.sendEmbed({ color: 1231329, description: words });
    }

    // ROLL AND FLIP COMMANDS
    if (commandIs('roll', message)) {
        var roll = random(1, 6);
        message.channel.sendMessage('You rolled a ' + roll + '!');
    }

    if (commandIs('flip', message)) {
        var flip = random(1, 2);
        if (flip == 1) {
            message.channel.sendMessage('You flipped Heads!');
        } else {
            message.channel.sendMessage('You flipped Tails!');
        }
    }

    // 8BALL
    if (commandIs('8ball', message)) {
        var shake = random(1, eballs.length);
        message.reply(eballs[shake]);
    }

    // TOXIC
    if (commandIs('toxic', message)) {
        var shitOutAnInsult = random(1, insults.length);
        message.channel.sendMessage(insults[shitOutAnInsult]);
    }

    // MEME
    if (commandIs('meme', message)) {
        var meme = random(1, memes.length);
        message.channel.sendMessage(memes[meme]);
    }

    // ADMIN CUSTOM PREFIX
    if (commandIs('prefix', message)) {
        if (message.author.id == ownerID) {
            customPrefix = args[1] + '-';
            message.channel.sendMessage('le~ prefix is now `' + customPrefix + '`.');
        } else {
            message.reply('U R NO OWNER');
        }
    }

    // PURGE AND CLEAR
    if (commandIs('purge', message)) {
        laRole = message.guild.roles.find("name", "botAdmin");
        if (message.member.roles.has(laRole.id)) {
            message.channel.bulkDelete(100).catch(console.error);
        } else {
            message.reply("Missing 'llamaAdmin' role");
        }
    }

    if (commandIs('clear', message)) {
        laRole = message.guild.roles.find("name", "botAdmin");
        if (message.member.roles.has(laRole.id)) {
            if (args[1] === null) {
                message.channel.sendMessage("lol wut? Usage: clear **x** (Replace **x** with number of message you want to delete)");
            } else {
                var msg = parseInt(args[1]) + 1;
                if (msg >= 101) {
                    message.channel.sendMessage("lol wut? Error: can't delete more than 99 messages!");
                } else {
                    message.channel.bulkDelete(msg).catch(console.error);
                }
            }
        } else {
            message.reply("Missing 'botAdmin' role");
        }
    }

    // MUSIC COMMANDS
    if (commandIs('summon', message)) {
        if (message.member.voiceChannel != null) {
            message.member.voiceChannel.join().then(connection => {
                console.log('Joined Voice Channel ' + connection.channel.name);
                var song = Math.floor(Math.random() * music.length) + 1;
                var dispatcher = connection.playFile('./music/' + music[song] + '.mp3');
                message.channel.sendMessage('**Now Playing** ' + music[song]);
                console.log('Playing ' + music[song]);
            });
        } else {
            message.channel.sendMessage('Not in a Voice Channel');
            console.log('Failed Connect to Voice Channel');
        }
    }

    if (commandIs('leave', message)) {
        if (message.member.voiceChannel != null) {
            message.member.voiceChannel.leave()
            console.log('Disconnected from Voice Channel');
        } else {
            message.channel.sendMessage('Not in a Voice Channel');
            console.log('Failed Disconnect from Voice Channel');
        }
    }

    // STAT COMMANDS
    if (commandIs('stats', message)) {
        message.channel.sendEmbed({ color: 3447003, description: '**Bot Statistics**\n\n' +
        '**Users** ' + bot.users.size +
        '\n**Channels** ' + bot.channels.size +
        '\n**Servers** ' + bot.guilds.size +
        '\n**Node.js Version** ' + process.version +
        '\n**Memory Usage** ' + process.memoryUsage().heapUsed/8/1024/1024 + 'gb' +
        '\n**Uptime** ' + bot.uptime/1000 + ' seconds' +
        '\n\n Use the **servers** command to list servers.'});
    }

    if (commandIs('servers', message)) {
        var servers = '';
        var inf = bot.guilds.array();

        for (var i = 0; i != bot.guilds.size; i++) {
           servers = servers + '\n' + inf[i];
           if (servers.length > 1900 ) {
                i = bot.guilds.size;
                servers = servers + '\n and more...';
            }
        }
        message.channel.sendEmbed({ color: 3447003, description: '**Bots are active in these servers;**\n' + servers });
    }

    // CREDITS AND HELP
    if (commandIs('help', message)) {
        message.author.sendEmbed({ color: 447003, description: 'Prefixes `' + prefix + '` / `' + altPrefix  + '` / `' + customPrefix + '`.' +
        '\n **Llama Bot - A Discord Bot Created by MinBoi (Minin)' +
        '\n\n**Developer Commands**' +
        '\n\n**ping** Pong' +
        "\n**ding** Dong" +
        "\n**tst** Sends 'Hello World!' message" +
        '\n\n**Music Commands** *Work in Progress*' +
        '\n\n**summon** Joins Voice Channel' +
        "\n**leave** Leaves Voice Channel" +
        '\n\n**User Commands**' +
        '\n\n**meme** Sends a random dank meme' +
        '\n**toxic** Shits out an insult' +
        '\n**roll** Rolls a die' +
        '\n**flip** Flips a coin' +
        '\n**8ball** Answers, for everything!' +
        '\n**say x** Replace x with words and then the bot will say them out' +
        '\n**embed x** Replace x with words and then the bot will put them in an embed' +
        '\n\n**Info Commands**' +
        '\n\n**help** Displays commands for this bot' +
        '\n**credits** Displays credits for this bot' +
        '\n**join** Servers for you to join and add Llama Bot to yours!' +
        '\n**stats** Displays bot statistics' +
        '\n**servers** Lists all the servers the bot is in' +
        '\n\n**Admin Commands**' +
        '\n\n**purge** Deletes messages in a channel' +
        '\n**clear x** Deletes messages in a channel, replace x with the amount of messages you want to delete'});
        message.channel.sendMessage('I just slid into your DMs. :smirk:');
    }

    if (commandIs('credits', message)) {
        message.channel.sendEmbed({ color: 1231329, description: '**MinBoi** Hosting + Programming' +
        '\n**KubGamingYT** Friend + Helped with code & music' +
        '\n**Discord API + Discord Bots Servers** Fixing Erorz + :think: meme' });
    }

    if (commandIs('join', message)) {
        message.channel.sendEmbed({ color: 9231321, description: "https://discord/gg/BBax4jk **MinBots Inc.** Llama Bot's home town." +
        "\nhttps://discord/gg/CHqzThm **Minin's Hangout** The server of the creator of Llama Bot." +
        '\n\nhttp://llamabot.tk **Website** The official Llama Bot website.' +
        '\nhttp://bit.ly/2oNnEEa **+LlamaBot** Add Llama Bot to your server!' });
    }
});

bot.login(token);
