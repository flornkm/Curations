const { createClient } = require('@supabase/supabase-js');
const Discord = require('discord.js');

// Your Discord bot token
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

// Your Supabase URL and API key
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default async function handler(req, res) {
    try {
        // Create a new Discord client
        const client = new Discord.Client({
            intents: [
                Discord.GatewayIntentBits.Guilds,
                Discord.GatewayIntentBits.GuildMessages,
                Discord.GatewayIntentBits.MessageContent
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
            const allMessages = [];
            let lastMessageId;
            let messages = await channel.messages.fetch({ limit: 100 });

            while (messages.size > 0) {
                lastMessageId = messages.last().id;
                allMessages.push(...messages.values());
                messages = await channel.messages.fetch({ before: lastMessageId, limit: 100 });
            }

            // Transform the messages into an array of objects
            const messageArray = allMessages.map((message) => ({
                link: message.content,
                timestamp: new Date(message.createdTimestamp).toLocaleString(),
            }));

            console.log(messages[0]);

            // Connect to the Supabase client
            const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

            // Retrieve all existing links from Supabase
            const { data: existingLinks, error: existingLinksError } = await supabase
                .from('unconfirmed_links')
                .select('link');

            if (existingLinksError) {
                console.error('Failed to retrieve existing links from the database:', existingLinksError.message);
                return;
            }

            // Store existing links in an array
            const existingLinksArray = existingLinks.map((link) => link.link);

            // Insert new messages into a Supabase table
            const newMessages = messageArray.filter((message) => {
                if (!existingLinksArray.includes(message.link)) {
                    existingLinksArray.push(message.link);
                    return true;
                }
                return false;
            });

            if (newMessages.length === 0) {
                console.log('No new messages to insert into the database.');
                return;
            }

            console.log('Existing links:', existingLinksArray.length);
            console.log('New messages:', newMessages.length);
            console.log('Inserting new messages into the database.', newMessages.length);

            const { data, error } = await supabase.from('unconfirmed_links').insert(newMessages);

            if (error) {
                console.error('Failed to insert messages into the database:', error.message);
                return;
            }

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

