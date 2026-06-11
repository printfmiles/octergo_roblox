import { REST, Routes } from 'discord.js';
import { helpCommandData } from '../apps/bot/src/commands/help.command';
import { verifyCommandData } from '../apps/bot/src/commands/verify.command';
import { syncRolesCommandData } from '../apps/bot/src/commands/sync-roles.command';
import { sessionAnnounceCommandData } from '../apps/bot/src/commands/session-announce.command';

const token = process.env.DISCORD_BOT_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DISCORD_GUILD_ID;

if (!token || !clientId) {
  console.error('DISCORD_BOT_TOKEN and DISCORD_CLIENT_ID are required');
  process.exit(1);
}

const commands = [
  verifyCommandData.toJSON(),
  syncRolesCommandData.toJSON(),
  sessionAnnounceCommandData.toJSON(),
  helpCommandData.toJSON(),
];

const rest = new REST({ version: '10' }).setToken(token);

async function deploy() {
  if (guildId) {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
    console.log(`Deployed ${commands.length} guild commands to ${guildId}`);
  } else {
    await rest.put(Routes.applicationCommands(clientId), { body: commands });
    console.log(`Deployed ${commands.length} global commands`);
  }
}

deploy().catch(console.error);
