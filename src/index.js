import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";
import { commandHandlers } from "./commands.js";

const token = process.env.DISCORD_TOKEN;

if (!token) {
  console.error("Falta DISCORD_TOKEN. Copia .env.example a .env y configúralo.");
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

client.on(Events.Error, (error) => {
  console.error("Error del cliente de Discord:", error);
});

try {
  await client.login(token);
} catch (error) {
  console.error("No se pudo iniciar sesión en Discord:", error);
  process.exitCode = 1;
}
