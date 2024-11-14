// import .env variables
import dotenv from 'dotenv'
dotenv.config()

// imports client, gateway intents
import {Client, GatewayIntentBits} from 'discord.js';

//imports audio player for voice
import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } from '@discordjs/voice';
import path from 'path';

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

client.on("ready", (c) => {
    console.log(`${c.user.tag} is ready!`);
    client.user.setActivity("I'm online");
})

client.on('messageCreate', (message) => {
    console.log(message.content);
})

client.on('voiceStateUpdate', async (oldState, newState) => {
    // Check if the user joined a channel
    if (!oldState.channelId && newState.channelId) {
        console.log(`${newState.member.user.tag} joined channel ${newState.channel.name}`);
        const member = newState.member;
        if(member.user.tag === 'erbsndspoices'){
            const voiceChannel = newState.member.voice.channel;

            const connection = joinVoiceChannel({
                channelId: newState.channelId,
                guildId: newState.guildId,
                adapterCreator: newState.guild.voiceAdapterCreator
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