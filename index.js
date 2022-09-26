console.log("loading")
require("dotenv").config()
const {
    Client,
    GatewayIntentBits,
    Partials
} = require("discord.js")
const options = {
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildMessageReactions
    ],
    partials: [Partials.Channel]
}
const client = new Client(options)

const Modules = {
    memberLogger: require("./Modules/member"),
    voiceLogger: require("./Modules/voice"),
    AntiSpam: require("./Modules/antispam")
}
client.on("voiceStateUpdate", (oldState, newState) => {
    if (newState && oldState) {
        if (oldState.channelId === newState.channelId) {
            if (oldState.selfDeaf !== newState.selfDeaf) Modules.voiceLogger("selfdeaf", newState.member, newState.channel, newState.selfDeaf)
            if (oldState.selfMute !== newState.selfMute) Modules.voiceLogger("selfmute", newState.member, newState.channel, newState.selfMute)
            if (oldState.selfVideo !== newState.selfVideo) Modules.voiceLogger("selfvideo", newState.member, newState.channel, newState.selfVideo)
            if (oldState.serverDeaf !== newState.serverDeaf) Modules.voiceLogger("serverdeaf", newState.member, newState.channel, newState.serverDeaf)
            if (oldState.serverMute !== newState.serverMute) Modules.voiceLogger("servermute", newState.member, newState.channel, newState.serverMute)
        }
        if (oldState.channelId === null && newState.channelId != null) Modules.voiceLogger("connect", newState.member, newState.channel, true)
        if (oldState.channelId != null && newState.channelId === null) Modules.voiceLogger("disconnect", newState.member, oldState.channel, true)
    }
});
client.on("ready", async () => {
    console.log("ready")
})
client.on("messageCreate", async message => {
    if (message.author.bot) return
    const AntiSpamUtil = await Modules.AntiSpam(message)
    if (AntiSpamUtil) return
})
client.on('guildMemberAdd', member => {
    Modules.memberLogger("join", member)
})
client.on('guildMemberRemove', member => {
    Modules.memberLogger("leave", member)
})
client.login(process.env.token)