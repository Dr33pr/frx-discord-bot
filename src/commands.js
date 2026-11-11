import { SlashCommandBuilder } from "discord.js";

export const commandDefinitions = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Comprueba si frx está en línea."),
  new SlashCommandBuilder()
    .setName("ayuda")
    .setDescription("Muestra los comandos disponibles."),
  new SlashCommandBuilder()
    .setName("play")
    .setDescription("Prepara una búsqueda o enlace de música.")
    .addStringOption((option) =>
      option
        .setName("consulta")
        .setDescription("Nombre de la canción o enlace")
        .setRequired(true)
        .setMaxLength(200),
    ),
];

export const commandHandlers = {
  ping: async (interaction) => {
    await interaction.reply(`¡Pong! Latencia: ${interaction.client.ws.ping} ms.`);
  },

  ayuda: async (interaction) => {
    await interaction.reply(
      [
        "**Comandos de frx**",
        "`/ping` — comprueba que el bot está en línea.",
        "`/ayuda` — muestra esta lista.",
        "`/play consulta:<texto o enlace>` — reservado para una futura fuente de audio autorizada.",
        "",
        "La reproducción todavía no está configurada.",
      ].join("\n"),
    );
  },

  play: async (interaction) => {
    await interaction.reply({
      content:
        "La reproducción aún no está configurada. frx no extrae audio de YouTube o Spotify; para activarla hará falta una fuente que permita expresamente reproducir audio en bots.",
      ephemeral: true,
    });
  },
};
