# OpenUtility Dashboard

> **Your Discord. Under control.**

The official web dashboard for **OpenUtility Bot** — a modern control center for Discord server security, moderation, logging, automation, configuration, and utilities.

OpenUtility Dashboard is designed to give server owners a clean, focused interface for managing their OpenUtility-powered servers without relying on a large collection of commands.

[![OpenUtility](https://img.shields.io/badge/OpenUtility-Dashboard-5865F2?style=flat-square)](https://openutility.bot.nu/)
[![Status](https://img.shields.io/badge/status-active-55e6a5?style=flat-square)](https://openutility.bot.nu/status/)
[![License](https://img.shields.io/badge/license-open%20source-58a6ff?style=flat-square)](https://github.com/OpenUtility2/openutility-dashboard)

## ✨ What is OpenUtility Dashboard?

OpenUtility Dashboard is the web control center that works alongside **OpenUtility Bot**.

It brings server management into one interface with dedicated areas for security, moderation, logging, welcome automation, embeds, configuration, documentation, and live status.

### Core areas

- 🏠 **Server Overview** — See important server information and configuration at a glance.
- 🛡️ **Security Center** — Security status, threat information, Anti-Nuke controls, and protection settings.
- 🚨 **Anti-Nuke & Recovery** — Protection workflows, emergency controls, trusted users, and recovery features.
- 🤖 **AutoMod** — Configure spam, invite, link, mention, caps, duplicate-content, and related protections.
- 👋 **Welcome Studio** — Configure welcome and leave messages, embeds, variables, images, DMs, and auto-role behavior.
- 🔨 **Moderation** — Manage moderation settings and review moderation cases and activity.
- 📋 **Advanced Logging** — Configure organized logging for messages, members, moderation, commands, and security events.
- 🎨 **Embed Builder** — Create Discord embeds with a visual workflow and live preview.
- ⚙️ **Server Configuration** — Centralized configuration for OpenUtility features.
- 🧰 **Utilities** — Access useful server and developer-focused tools.
- 📚 **Documentation** — Built-in documentation and feature information.
- 🟢 **Live Status** — Monitor OpenUtility services and availability.

## 🖥️ Live Dashboard

**Website:** https://openutility.bot.nu/

**Status:** https://openutility.bot.nu/status/

**Documentation:** https://openutility.bot.nu/docs/

## 🔗 OpenUtility Ecosystem

| Project | Description |
| --- | --- |
| [`openutility`](https://github.com/OpenUtility2/openutility) | Main OpenUtility website and platform |
| [`openutility-bot`](https://github.com/OpenUtility2/openutility-bot) | Main Discord bot |
| [`openutility-dashboard`](https://github.com/OpenUtility2/openutility-dashboard) | Web dashboard — this repository |
| [`openutility-api`](https://github.com/OpenUtility2/openutility-api) | Backend/API for authentication, server data, and configuration |
| [`mctools`](https://github.com/OpenUtility2/mctools) | Minecraft tools platform |
| [`speedcheck`](https://github.com/OpenUtility2/speedcheck) | Internet/network speed testing project |

## 🏗️ Architecture

OpenUtility uses separate components so the dashboard, API, and Discord bot can evolve independently.

```text
                         ┌──────────────────────┐
                         │     Discord User     │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ OpenUtility Dashboard│
                         │      Web UI          │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   OpenUtility API    │
                         │ Auth / Config / Data │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   OpenUtility Bot    │
                         │ Discord Integration  │
                         └──────────────────────┘
```

The dashboard is the presentation layer. Server-side authentication, persistent configuration, and Discord API operations belong in the companion API/backend rather than being exposed in the browser.

## 📁 Project Structure

```text
openutility-dashboard/
├── assets/              # Images and dashboard assets
├── dashboard/           # Dashboard pages/components
├── developer/           # Developer-focused resources
├── docs/                # Documentation resources
├── features/            # Feature resources
├── live-status/         # Service/status pages
├── about/               # About pages
├── changelog/           # Changelog resources
├── index.html           # Main landing page
├── dashboard.html       # Dashboard entry point
├── dashboard-core.html  # Dashboard core UI
├── dashboard-v4.js      # Dashboard functionality
├── dashboard-polish.js  # UI/UX enhancements
├── docs.html             # Documentation entry page
├── about.html            # About entry page
└── CNAME                # Custom domain configuration
```

## 🚀 Development

This repository is primarily a browser-based web project and does not require a Node.js build step for the static dashboard pages.

### Clone

```bash
git clone https://github.com/OpenUtility2/openutility-dashboard.git
cd openutility-dashboard
```

### Run locally

Use any static HTTP server. For example, with Python:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

You can also use VS Code Live Server or another static development server.

## 🔐 Authentication & API

Authentication and protected Discord operations should be handled by the **OpenUtility API**.

The dashboard can act as the frontend while the backend handles:

- Discord OAuth2 authentication
- Session management
- Discord API requests
- Server discovery
- Permission checks
- Persistent server configuration
- Secure bot-token handling

Never place Discord client secrets, bot tokens, session secrets, or other private credentials in frontend HTML or JavaScript.

## 🌐 Deployment

The dashboard is configured for the custom domain:

```text
https://openutility.bot.nu/
```

For static hosting, make sure the hosting provider serves the repository root and preserves the directory structure used by the dashboard.

If authentication is enabled, configure the corresponding Discord OAuth2 redirect URI in the Discord Developer Portal and keep OAuth secrets exclusively in the backend environment.

## 🎯 Design Goals

OpenUtility Dashboard is built around a few principles:

- **Simple** — important controls should be easy to find.
- **Professional** — consistent UI, spacing, typography, and interaction patterns.
- **Security-focused** — sensitive operations belong behind appropriate permissions and server-side checks.
- **Discord-native** — the dashboard should feel natural to Discord server owners.
- **Modular** — features should be independently maintainable.
- **Open source** — the project remains transparent and community-friendly.

## 🤝 Contributing

Contributions, bug reports, UI improvements, feature ideas, and documentation updates are welcome.

Before submitting a change:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the affected pages and responsive layouts.
5. Open a pull request with a clear description of the change.

For larger changes, open an issue first so the approach can be discussed before implementation.

## 🐛 Issues & Feature Requests

Found a problem or have an idea?

Open an issue in the repository and include:

- What happened
- What you expected to happen
- Steps to reproduce the issue
- Browser/device information when relevant
- Screenshots or console errors when useful

## 📜 License

See the repository files for the current license and project terms.

## 💙 OpenUtility

OpenUtility is an open-source Discord ecosystem focused on giving server owners practical tools for **security, moderation, automation, configuration, and server management**.

**OpenUtility — Your Discord. Under control.**

---

<p align="center">
  Built with care by the OpenUtility community.
</p>
