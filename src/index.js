import "dotenv/config";
import {
  Client,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
} from "discord.js";
import { commandDefinitions, commandHandlers } from "./commands.js";

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;
const missing = [
  ["DISCORD_TOKEN", DISCORD_TOKEN],
  ["CLIENT_ID", CLIENT_ID],
  ["GUILD_ID", GUILD_ID],
]
  .filter(([, value]) => !value)
  .map(([name]) => name);

if (missing.length > 0) {
  console.error(`Faltan estas variables de entorno: ${missing.join(", ")}.`);
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`frx está conectado como ${readyClient.user.tag}.`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  const handler = commandHandlers[interaction.commandName];
  if (!handler) {
    await interaction.reply({
      content: "No reconozco ese comando.",
      ephemeral: true,
    });
    return;
  }

  try {
    await handler(interaction);
  } catch (error) {
    console.error(`Error al ejecutar /${interaction.commandName}:`, error);

    const response = {
      content: "No pude completar el comando. Inténtalo de nuevo.",
      ephemeral: true,
    };

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(response);
    } else {
      await interaction.reply(response);
    }
  }
});

try {
  const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
  await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
    body: commandDefinitions.map((command) => command.toJSON()),
  });
  console.log("Comandos de frx registrados en el servidor.");
  await client.login(DISCORD_TOKEN);
} catch (error) {
  console.error("No se pudieron registrar los comandos o iniciar sesión:", error);
  process.exitCode = 1;
}

client.on(Events.Error, (error) => {
  console.error("Error del cliente de Discord:", error);
});
