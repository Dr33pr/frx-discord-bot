import "dotenv/config";
import { REST, Routes } from "discord.js";
import { commandDefinitions } from "./src/commands.js";

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;
const missing = [
  ["DISCORD_TOKEN", DISCORD_TOKEN],
  ["CLIENT_ID", CLIENT_ID],
  ["GUILD_ID", GUILD_ID],
]
  .filter(([, value]) => !value)
  .map(([name]) => name);

if (missing.length > 0) {
  console.error(`Faltan estas variables en .env: ${missing.join(", ")}`);
  process.exit(1);
}

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

try {
  await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
    body: commandDefinitions.map((command) => command.toJSON()),
  });
  console.log("Comandos de frx registrados en el servidor.");
} catch (error) {
  console.error("No se pudieron registrar los comandos:", error);
  process.exitCode = 1;
}
