require('dotenv').config();
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('imageoptimizer')
        .setDescription('Optimize an image using either lossy or lossless.')
        .addAttachmentOption(option => 
            option
            .setName('image')
            .setDescription('The image you want re-sent!')
            .setRequired(true))
        .addStringOption(option =>
            option
            .setName('type')
            .setDescription('The type of compression')
            .setRequired(true)
            .addChoices(
                { name: 'Lossy', value: 'lossy' },
                { name: 'Lossless', value: 'lossless' }
            )),
    async execute(interaction){
        const image = interaction.options.getAttachment('image');
        if (!(image.contentType === 'image/png') && !(image.contentType === 'image/jpeg')){
            await interaction.reply(`${image.contentType.split('/')[1].toUpperCase()} is not supported! (Only JPEG or PNG format)`)
        } else {
            const apiReq = await fetch ('https://api.cheetaho.com/api/v2/media/optimization', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'key': process.env.API_KEY_imgoptimize,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "compression":interaction.options.getString('type'),
                    "keep_exif":1,
                    "web_p":false,
                    "url": image.url,
                    "wait":true
                })
            })

            const response = await apiReq.json()
            const responseEmbed = {
                color: 0x0099FF,
                title: `Image Optimizer Result: Saved ${response.data.item.saved_percent}%`,
                image: {
                    url: response.data.item.url,
                },
                footer: {
                    text: `Reduced by ${response.data.item.saved_bytes} bytes!`
                }
            }
            interaction.reply({ embeds: [responseEmbed] })
        } 
    }
}