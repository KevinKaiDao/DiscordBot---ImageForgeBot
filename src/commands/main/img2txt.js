const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('img2txt')
        .setDescription('Uses ORC .')
        .addAttachmentOption(option => 
            option
            .setName('image')
            .setDescription('The image you want re-sent!')
            .setRequired(true)),
    async execute(interaction){
        const image = interaction.options.getAttachment('image');
        if (!(image.contentType === 'image/png') && !(image.contentType === 'image/jpeg')){
            await interaction.reply(`${image.contentType.split('/')[1].toUpperCase()} is not supported! (Only JPEG or PNG format)`)
        } else {
            const imgURL = image.url;
            const header = new Headers();
            header.append("apikey", process.env.API_KEY_img2txt);

            const requestOptions = {
                method: 'GET',
                redirect: 'follow',
                headers: header
            };
            
            const response = await fetch(`https://api.apilayer.com/image_to_text/url?url=${imgURL}`, requestOptions)
            const text = await response.json();
            
            const responseEmbed = {
                color: 0x0099FF,
                title: 'Img2Text Results',
                description: text.all_text,
                image: {
                    url: image.url,
                }
            }
            interaction.reply({ embeds: [responseEmbed] });
        }
    }
}