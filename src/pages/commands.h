<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Aris Bot Commands - View all available commands organized by category.">
    <title>Commands - Aris Bot</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="../css/main.css">
</head>
<body class="bg-slate-950 text-white overflow-x-hidden">

    <!-- Navigation -->
    <nav class="fixed w-full top-0 z-50 bg-slate-950 bg-opacity-80 backdrop-blur-md border-b border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <a href="../index.html" class="flex items-center space-x-2">
                    <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <span class="text-white font-bold text-sm">A</span>
                    </div>
                    <span class="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Aris Bot</span>
                </a>

                <!-- Desktop Navigation -->
                <div class="hidden md:flex items-center space-x-8">
                    <a href="../index.html" class="text-gray-400 hover:text-white transition">Home</a>
                    <a href="../index.html#features" class="text-gray-400 hover:text-white transition">Features</a>
                    <a href="#" class="text-gray-400 hover:text-white transition">Commands</a>
                </div>

                <!-- CTA Buttons -->
                <div class="hidden md:flex items-center space-x-4">
                    <a href="#" class="btn-primary px-6 py-2 rounded-lg text-sm font-medium text-white">Invite Bot</a>
                </div>

                <!-- Mobile Menu Button -->
                <button class="md:hidden text-gray-400 hover:text-white" id="mobile-menu-btn">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            <!-- Mobile Menu -->
            <div class="md:hidden hidden" id="mobile-menu">
                <div class="px-2 pt-2 pb-3 space-y-1">
                    <a href="../index.html" class="block px-3 py-2 text-gray-400 hover:text-white">Home</a>
                    <a href="../index.html#features" class="block px-3 py-2 text-gray-400 hover:text-white">Features</a>
                    <a href="#" class="block px-3 py-2 btn-primary rounded-lg text-white text-center mt-2">Invite Bot</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Page Header -->
    <section class="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
            <h1 class="text-5xl md:text-6xl font-bold mb-4 section-title">Bot Commands</h1>
            <p class="text-xl text-gray-400 max-w-2xl">Discover all available commands organized by category. Each command is designed to enhance your server's functionality.</p>
            
            <!-- Search Bar -->
            <div class="mt-8">
                <input type="text" id="search-input" placeholder="Search commands..." class="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition">
            </div>
        </div>
    </section>

    <!-- Commands Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">

            <!-- MODERATION CATEGORY -->
            <div class="mb-20" data-category="moderation">
                <div class="flex items-center mb-8">
                    <div class="category-badge rounded-lg px-4 py-2 mr-4">
                        <span class="font-semibold">⚔️ Moderation</span>
                    </div>
                    <div class="h-px flex-1 bg-gradient-to-r from-purple-500 to-transparent"></div>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Command Card: Ban -->
                    <div class="command-card rounded-lg p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-lg font-bold text-white">/ban</h3>
                                <p class="text-gray-400 text-sm mt-1">Ban a member from the server</p>
                            </div>
                        </div>
                        <div class="mb-4">
                            <p class="text-xs text-gray-500 font-semibold mb-2">Usage:</p>
                            <code class="text-sm bg-slate-900 rounded p-2 block text-cyan-300">/ban @user [reason]</code>
                        </div>
                        <div class="flex gap-2">
                            <span class="text-xs bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">Requires: Ban Members</span>
                        </div>
                    </div>

                    <!-- Command Card: Kick -->
                    <div class="command-card rounded-lg p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-lg font-bold text-white">/kick</h3>
                                <p class="text-gray-400 text-sm mt-1">Kick a member from the server</p>
                            </div>
                        </div>
                        <div class="mb-4">
                            <p class="text-xs text-gray-500 font-semibold mb-2">Usage:</p>
                            <code class="text-sm bg-slate-900 rounded p-2 block text-cyan-300">/kick @user [reason]</code>
                        </div>
                        <div class="flex gap-2">
                            <span class="text-xs bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">Requires: Kick Members</span>
                        </div>
                    </div>

                    <!-- Command Card: Mute -->
                    <div class="command-card rounded-lg p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-lg font-bold text-white">/mute</h3>
                                <p class="text-gray-400 text-sm mt-1">Mute a member temporarily</p>
                            </div>
                        </div>
                        <div class="mb-4">
                            <p class="text-xs text-gray-500 font-semibold mb-2">Usage:</p>
                            <code class="text-sm bg-slate-900 rounded p-2 block text-cyan-300">/mute @user <time> [reason]</code>
                        </div>
                        <div class="flex gap-2">
                            <span class="text-xs bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">Requires: Moderate Members</span>
                        </div>
                    </div>

                    <!-- Command Card: Warn -->
                    <div class="command-card rounded-lg p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-lg font-bold text-white">/warn</h3>
                                <p class="text-gray-400 text-sm mt-1">Issue a warning to a member</p>
                            </div>
                        </div>
                        <div class="mb-4">
                            <p class="text-xs text-gray-500 font-semibold mb-2">Usage:</p>
                            <code class="text-sm bg-slate-900 rounded p-2 block text-cyan-300">/warn @user [reason]</code>
                        </div>
                        <div class="flex gap-2">
                            <span class="text-xs bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">Requires: Moderate Members</span>
                        </div>
                    </div>

                    <!-- Command Card: Purge -->
                    <div class="command-card rounded-lg p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-lg font-bold text-white">/purge</h3>
                                <p class="text-gray-400 text-sm mt-1">Delete messages in bulk</p>
                            </div>
                        </div>
                        <div class="mb-4">
                            <p class="text-xs text-gray-500 font-semibold mb-2">Usage:</p>
                            <code class="text-sm bg-slate-900 rounded p-2 block text-cyan-300">/purge <amount></code>
                        </div>
                        <div class="flex gap-2">
                            <span class="text-xs bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">Requires: Manage Messages</span>
                        </div>
                    </div>

                    <!-- Command Card: Lock -->
                    <div class="command-card rounded-lg p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-lg font-bold text-white">/lock</h3>
                                <p class="text-gray-400 text-sm mt-1">Lock a channel from messages</p>
                            </div>
                        </div>
                        <div class="mb-4">
                            <p class="text-xs text-gray-500 font-semibold mb-2">Usage:</p>
                            <code class="text-sm bg-slate-900 rounded p-2 block text-cyan-300">/lock [channel]</code>
                        </div>
                        <div class="flex gap-2">
                            <span class="text-xs bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">Requires: Manage Channels</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- UTILITY CATEGORY -->
            <div class="mb-20" data-category="utility">
                <div class="flex items-center mb-8">
                    <div class="category-badge rounded-lg px-4 py-2 mr-4">
                        <span class="font-semibold">🔧 Utility</span>
                    </div>
                    <div class="h-px flex-1 bg-gradient-to-r from-purple-500 to-transparent"></div>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Command Card: Help -->
                    <div class="command-card rounded-lg p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-lg font-bold text-white">/help</h3>
                                <p class="text-gray-400 text-sm mt-1">Show all available commands</p>
                            </div>
                        </div>
                        <div class="mb-4">
                            <p class="text-xs text-gray-500 font-semibold mb-2">Usage:</p>
                            <code class="text-sm bg-slate-900 rounded p-2 block text-cyan-300">/help [command]</code>
                        </div>
                        <div class="flex gap-2">
                            <span class="text-xs bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">Public</span>
                        </div>
                    </div>

                    <!-- Command Card: Info -->
                    <div class="command-card rounded-lg p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-lg font-bold text-white">/info</h3>
                                <p class="text-gray-400 text-sm mt-1">Get bot information</p>
                            </div>
                        </div>
                        <div class="mb-4">
                            <p class="text-xs text-gray-500 font-semibold mb-2">Usage:</p>
                            <code class="text-sm bg-slate-900 rounded p-2 block text-cyan-300">/info</code>
                        </div>
                        <div class="flex gap-2">
                            <span class="text-xs bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">Public</span>
                        </div>
                    </div>

                    <!-- Command Card: Ping -->
                    <div class="command-card rounded-lg p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-lg font-bold text-white">/ping</h3>
                                <p class="text-gray-400 text-sm mt-1">Check bot latency</p>
                            </div>
                        </div>
                        <div class="mb-4">
                            <p class="text-xs text-gray-500 font-semibold mb-2">Usage:</p>
                            <code class="text-sm bg-slate-900 rounded p-2 block text-cyan-300">/ping</code>
                        </div>
                        <div class="flex gap-2">
                            <span class="text-xs bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">Public</span>
                        </div>
                    </div>

                    <!-- Command Card: Avatar -->
                    <div class="command-card rounded-lg p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-lg font-bold text-white">/avatar</h3>
                                <p class="text-gray-400 text-sm mt-1">Display user's avatar</p>
                            </div>
                        </div>
                        <div class="mb-4">
                            <p class="text-xs text-gray-500 font-semibold mb-2">Usage:</p>
                            <code class="text-sm bg-slate-900 rounded p-2 block text-cyan-300">/avatar [@user]</code>
                        </div>
                        <div class="flex gap-2">
                            <span class="text-xs bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">Public</span>
                        </div>
                    </div>

                    <!-- Command Card: Userinfo -->
                    <div class="command-card rounded-lg p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-lg font-bold text-white">/userinfo</h3>
                                <p class="text-gray-400 text-sm mt-1">Get user information</p>
                            </div>
                        </div>
                        <div class="mb-4">
                            <p class="text-xs text-gray-500 font-semibold mb-2">Usage:</p>
                            <code class="text-sm bg-slate-900 rounded p-2 block text-cyan-300">/userinfo [@user]</code>
                        </div>
                        <div class="flex gap-2">
                            <span class="text-xs bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">Public</span>
                        </div>
                    </div>

                    <!-- Command Card: Serverinfo -->
                    <div class="command-card rounded-lg p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-lg font-bold text-white">/serverinfo</h3>
                                <p class="text-gray-400 text-sm mt-1">Get server information</p>
                            </div>
                        </div>
                        <div class="mb-4">
                            <p class="text-xs text-gray-500 font-semibold mb-2">Usage:</p>
                            <code class="text-sm bg-slate-900 rounded p-2 block text-cyan-300">/serverinfo</code>
                        </div>
                        <div class="flex gap-2">
                            <span class="text-xs bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">Public</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- FUN CATEGORY -->
            <div class="mb-20" data-category="fun">
                <div class="flex items-center mb-8">
                    <div class="category-badge rounded-lg px-4 py-2 mr-4">
                        <span class="font-semibold">🎮 Fun</span>
                    </div>
                    <div class="h-px flex-1 bg-gradient-to-r from-purple-500 to-transparent"></div>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Command Card: Roll -->
                    <div class="command-card rounded-lg p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-lg font-bold text-white">/roll</h3>
                                <p class="text-gray-400 text-sm mt-1">Roll a dice (1-100)</p>
                            </div>
                        </div>
                        <div class="mb-4">
                            <p class="text-xs text-gray-500 font-semibold mb-2">Usage:</p>
                            <code class="text-sm bg-slate-900 rounded p-2 block text-cyan-300">/roll</code>
                        </div>
                        <div class="flex gap-2">
                            <span class="text-xs bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">Public</span>
                        </div>
                    </div>

                    <!-- Command Card: Flip -->
                    <div class="command-card rounded-lg p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-lg font-bold text-white">/flip</h3>
                                <p class="text-gray-400 text-sm mt-1">Flip a coin</p>
                            </div>
                        </div>
                        <div class="mb-4">
                            <p class="text-xs text-gray-500 font-semibold mb-2">Usage:</p>
                            <code class="text-sm bg-slate-900 rounded p-2 block text-cyan-300">/flip</code>
                        </div>
                        <div class="flex gap-2">
                            <span class="text-xs bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">Public</span>
                        </div>
                    </div>

                    <!-- Command Card: Joke -->
                    <div class="command-card rounded-lg p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-lg font-bold text-white">/joke</h3>
                                <p class="text-gray-400 text-sm mt-1">Tell a random joke</p>
                            </div>
                        </div>
                        <div class="mb-4">
                            <p class="text-xs text-gray-500 font-semibold mb-2">Usage:</p>
                            <code class="text-sm bg-slate-900 rounded p-2 block text-cyan-300">/joke</code>
           
