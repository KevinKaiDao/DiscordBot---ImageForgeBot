# "ImageForge" Discord Chatbot 

## Overview
This project is a Discord chatbot developed in Node.js, featuring image processing capabilities such as img2txt, image optimization, and URL-to-image conversion. The bot enhances user experience within Discord servers by providing versatile image-related functionalities.

## Overview
- img2txt Conversion: Convert images to text format, allowing users to extract text content from images.
- Image Optimization: Optimize images to reduce file size and enhance loading speed, improving server performance.
- URL-to-Image Conversion: Fetch images from URLs and display them within Discord servers, enriching communication and interaction.

## Installation
1. Clone the repository:
```
git clone https://github.com/KevinKaiDao/ImageForge-DiscordBot.git
```

2. Install dependencies:
```
npm install
```

3. Configure environment variables:
- Create a .env file in the project root.
- Add your Discord bot token:
```
TOKEN=your_discord_bot_token
```

4. Start the bot:
```
node index.js
```

## Usage
- Invite the bot to your Discord server.
- Use bot commands to perform image-related actions:
 - !img2txt <image_attachment>: Convert an image to text format.
 - !optimize <image_attachment>: Optimize an image for faster loading.
 - !url2img <image_url>: Convert a URL to an image and display it.
