# frx — bot de Discord

Base en Node.js y discord.js con comandos slash. La reproducción de música no está habilitada todavía; `/play` es informativo y no descarga ni retransmite audio de YouTube o Spotify.

## Requisitos

- Node.js 20 o posterior.
- Una aplicación y un bot creados en el [Portal de desarrolladores de Discord](https://discord.com/developers/applications).

## Configuración

1. En el Portal, crea una aplicación llamada `frx` y añade un bot en la sección **Bot**.
2. Copia el token del bot y el ID de la aplicación. Activa el **Developer Mode** de Discord para copiar también el ID de tu servidor.
3. En esta carpeta, copia `.env.example` a `.env` y completa:

   ```env
   DISCORD_TOKEN=token_del_bot
   CLIENT_ID=id_de_la_aplicacion
   GUILD_ID=id_del_servidor
   ```

   No compartas ni publiques el archivo `.env`.

4. Invita el bot desde **OAuth2 > URL Generator**, seleccionando los scopes `bot` y `applications.commands`. Para esta base bastan los permisos `View Channels`, `Send Messages` y `Use Application Commands`.
5. Instala dependencias y registra los comandos en el servidor:

   ```sh
   npm install
   npm run deploy-commands
   ```

6. Inicia el bot:

   ```sh
   npm start
   ```

Usa `/ping`, `/ayuda` y `/play consulta:<texto o enlace>` en el servidor. Los comandos se registran para ese servidor de forma que aparezcan sin esperar la propagación global.

## Música

La reproducción requiere una fuente de audio cuyo uso en bots esté permitido. Los enlaces de Spotify no proporcionan el audio al bot y este proyecto no extrae audio de YouTube. Antes de añadir reproducción habrá que elegir una fuente autorizada.
