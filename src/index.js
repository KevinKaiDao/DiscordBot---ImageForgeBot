require('dotenv').config();
const fs = require('fs'); // Need this to select files (File selector)
const path = require('path'); // Need this to be able to access the path of files/folders
const { Client, IntentsBitField, Collection } = require('discord.js');
const getLocalCommands = require('./utils/getLocalCommands');
// The Collection class extends on MAP class, used to tore and efficiently retrieve commands for execution.

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
    ],
});

client.commands = new Collection();
const commands = getLocalCommands();

for (const command of commands){
    if ('data' in command && 'execute' in command){
        client.commands.set(command.data.name, command);
    } else {
        console.log(`Command at ${filePath} is missing something!`);
    }
}

client.login(process.env.TOKEN);
client.on('ready', () => {
    console.log(`${client.user.tag} is now online!`);
});

client.on('interactionCreate', async (interaction) => { 
    if (!interaction.isChatInputCommand()) return;
    
    const command = interaction.client.commands.get(interaction.commandName); // Var for the given command
    if (!command){
        console.error(`No commands matching ${interaction.commandName} was found.`) // If command doesn't exist
        return;
    }

    try {
        await command.execute(interaction); // Executes the command
    } catch (error) {
        console.error(error);
    }
});