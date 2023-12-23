require('dotenv').config();
const { REST, Routes } = require('discord.js');
const { clientID, guildID } = require('./config');
const getLocalCommands = require('./getLocalCommands');

const commands = getLocalCommands();
for (n in commands){
	if ('data' in commands[n] && 'execute' in commands[n]){
		commands[n] = commands[n].data.toJSON();
	}
}

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        const data = await rest.put(
            Routes.applicationGuildCommands(clientID, guildID),
            { body: commands },
        );
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();