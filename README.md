# OpenUtility Bot Web

A production-ready foundation for the OpenUtility Bot dashboard: Discord OAuth2 login, real server discovery, persistent per-server configuration, moderation controls, logging controls, command documentation, and OpenUtility branding.

## Requirements

- Node.js 20+
- A Discord application/bot
- OAuth2 redirect URL configured in the Discord Developer Portal
- Bot token kept server-side

## Setup

1. Copy `.env.example` to `.env`.
2. Fill in:
   - `DISCORD_CLIENT_ID`
   - `DISCORD_CLIENT_SECRET`
   - `DISCORD_REDIRECT_URI`
   - `DISCORD_BOT_TOKEN`
   - `SESSION_SECRET`
3. In Discord Developer Portal, add the exact redirect URL from `DISCORD_REDIRECT_URI`.
4. Start the site:

```bash
npm start
```

5. Open `http://localhost:3000`.

## What is real

- Discord OAuth2 authentication uses the authorization-code flow.
- The dashboard discovers servers from the signed-in Discord account and filters to servers where the user is the owner or has Manage Server permission.
- When a bot token is configured, the dashboard checks whether OpenUtility is installed, reads guild counts, and loads text channels for channel selectors.
- Server configuration is persisted in `data/config.json`.
- Prefix, slash/prefix modes, moderation settings, logging settings, and log-channel IDs are saved per server.

## Important bot integration step

The web dashboard stores configuration; your Discord bot process must read the same configuration store or call the dashboard's storage API to enforce those settings. The dashboard intentionally does not fake actions such as banning members. Actual moderation actions still require the bot to be running with the appropriate Discord permissions.

For production, move persistent storage to a database and use HTTPS. Keep OAuth client secrets and the bot token exclusively on the server.
