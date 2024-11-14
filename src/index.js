// import .env variables
import dotenv from 'dotenv'
dotenv.config()

// imports client, gateway intents
import {Client, GatewayIntentBits} from 'discord.js';

//imports audio player for voice
import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } from '@discordjs/voice';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ]
});

// Ready check
client.on("ready", (c) => {
    console.log(`${c.user.tag} is ready!`);
    client.user.setActivity("I'm online");
})


// can just delete, this was for testing
client.on('messageCreate', (message) => {
    console.log(message.content);
})


// listener for voiceStateUpdate
client.on('voiceStateUpdate', async (oldState, newState) => {
    // Check if the user joined a channel
    if (!oldState.channelId && newState.channelId) {
        console.log(`${newState.member.user.tag} joined channel ${newState.channel.name}`);
        const member = newState.member;
        if(member.user.tag === 'erbsndspoices'){

            // creates joinVoiceChannel object
            const connection = joinVoiceChannel({
                channelId: newState.channelId,
                guildId: newState.guild.id,
                adapterCreator: newState.guild.voiceAdapterCreator
            });

            console.log(newState.channelId);
            console.log(newState.guild.id);
        

            // creates audio player and resource for the player
            const player = createAudioPlayer();
            const resource = createAudioResource(path.join(__dirname, 'src', 'soundfiles', 'sound.mp3')); // can change directory how you would please.

            console.log(path.join(__dirname, 'src', 'soundfiles', 'sound.mp3'));

            player.play(resource);
            connection.subscribe(player);

            player.on(AudioPlayerStatus.Idle, () => {
                player.play(createAudioResource(path.join(__dirname, 'src', 'soundfiles', 'sound.mp3')));
            });


            // debugging audio
            player.on('stateChange', (oldState, newState) => {

            });

            player.on('error', (error) => {

            });
            
        }

    }

    // Check if the user left a channel
    if (oldState.channelId && !newState.channelId) {
        console.log(`${oldState.member.user.tag} left channel ${oldState.channel.name}`);
        const member = oldState.member;
        if(member.user.tag === 'erbsndspoices'){
            
        }

    }
});



client.login(TOKEN);