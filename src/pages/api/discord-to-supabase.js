const { createClient } = require('@supabase/supabase-js');
const Discord = require('discord.js');

// Your Discord bot token
const DISCORD_TOKEN = 'process.env.DISCORD_TOKEN';

// Your Supabase URL and API key
const SUPABASE_URL = 'process.env.NEXT_PUBLIC_SUPABASE_URL';
const SUPABASE_KEY = 'process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY';

export default async function handler(req, res) {
  try {
    // Create a new Discord client
    const client = new Discord.Client({
        intents: [
          Discord.GatewayIntentBits.Guilds,
          Discord.GatewayIntentBits.GuildMessages,
        ]
      });

    // When the client is ready, retrieve messages from the #contributions channel
    client.on('ready', async () => {
      console.log(`Logged in as ${client.user.tag}!`);

      // Retrieve the #contributions channel
      const channel = client.channels.cache.find((channel) => channel.name === 'contributions');

      if (!channel) {
        console.error('Could not find the #contributions channel.');
        return;
      }

      // Retrieve all messages from the channel
      const messages = await channel.messages.fetch();

      // Transform the messages into an array of objects
      const messageArray = messages.map((message) => ({
        link: message.link,
        timestamp: message.createdTimestamp,
      }));

      // Connect to the Supabase client
      const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

      // Insert the messages into a Supabase table
      const { data, error } = await supabase.from('unconfirmed_links').insert(messageArray);

      if (error) {
        console.error('Failed to insert messages into the database:', error.message);
        return;
      }

      console.log('Inserted', data.length, 'messages into the database.');

      // Disconnect the Discord client
      client.destroy();

      // Return a success response
      res.status(200).json({ message: 'Messages inserted successfully.' });
    });

    // Login to the Discord client
    await client.login(DISCORD_TOKEN);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ message: 'Failed to insert messages.' });
  }
}

