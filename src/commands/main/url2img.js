require('dotenv').config();
const MD5 = require('md5.js');
const { SlashCommandBuilder } = require('discord.js');

function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }

module.exports = {
    data: new SlashCommandBuilder()
        .setName('url2img')
        .setDescription('Sends the landing page of the url provided')
        .addStringOption(option =>
            option
            .setName('url')
            .setDescription('The url of the website')
            .setRequired(true))
        .addBooleanOption(option =>
            option
            .setName('fullpage')
            .setDescription('Set to True if you want to capture the whole webpage.')
            .setRequired(true)),
    async execute(interaction){
        const url = interaction.options.getString('url');
        var fullpage = interaction.options.getBoolean('fullpage');

        if (!isValidUrl(url)){
            interaction.reply('The provided URL is not valid!');
        } else {
            var secret_key = new MD5().update(`${url}${process.env.url2img_secretWord}`).digest('hex')
            interaction.reply(`http://api.screenshotlayer.com/api/capture?access_key=${process.env.API_KEY_url2img}&url=${url}&fullpage=${+fullpage}&secret_key=${secret_key}`);
        }
    }
}