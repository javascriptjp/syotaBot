const config = require("./config.json")
module.exports = (type, member, channel, state) => {
    if (type == "connect") {
        member.guild.channels.cache.get(config.voicemessages).send({
            embeds: [{
                color: 0x79bbff,
                title: member.user.tag,
                description: `\`${member.user.tag}\`が\`${channel.name}\`へ参加しました`,
                timestamp: new Date(),
                thumbnail: {
                    url: member.user.avatarURL()
                },
                footer: {
                    icon_url: member.guild.iconURL(),
                    text: "©️無名鯖 | setuna/Soso"
                },
            }]
        })
    } else if (type == "disconnect") {
        member.guild.channels.cache.get(config.voicemessages).send({
            embeds: [{
                color: 0x79bbff,
                title: member.user.tag,
                description: `\`${member.user.tag}\`が\`${channel.name}\`から退出しました`,
                timestamp: new Date(),
                thumbnail: {
                    url: member.user.avatarURL()
                },
                footer: {
                    icon_url: member.guild.iconURL(),
                    text: "©️無名鯖 | setuna/Soso"
                },
            }]
        })
    } else if (type == "selfdeaf") {
        member.guild.channels.cache.get(config.voicemessages).send({
            embeds: [{
                color: 0x79bbff,
                title: member.user.tag,
                description: `\`${member.user.tag}\`が\`${channel.name}\`にて${state?"スピーカーミュートしました":"スピーカーミュートを解除しました"}`,
                timestamp: new Date(),
                thumbnail: {
                    url: member.user.avatarURL()
                },
                footer: {
                    icon_url: member.guild.iconURL(),
                    text: "©️無名鯖 | setuna/Soso"
                },
            }]
        })
    } else if (type == "selfmute") {
        member.guild.channels.cache.get(config.voicemessages).send({
            embeds: [{
                color: 0x79bbff,
                title: member.user.tag,
                description: `\`${member.user.tag}\`が\`${channel.name}\`にて${state?"ミュートしました":"ミュートを解除しました"}`,
                timestamp: new Date(),
                thumbnail: {
                    url: member.user.avatarURL()
                },
                footer: {
                    icon_url: member.guild.iconURL(),
                    text: "©️無名鯖 | setuna/Soso"
                },
            }]
        })
    } else if (type == "selfmute") {
        member.guild.channels.cache.get(config.voicemessages).send({
            embeds: [{
                color: 0x79bbff,
                title: member.user.tag,
                description: `\`${member.user.tag}\`が\`${channel.name}\`にて${state?"カメラを付けました":"カメラを切りました"}`,
                timestamp: new Date(),
                thumbnail: {
                    url: member.user.avatarURL()
                },
                footer: {
                    icon_url: member.guild.iconURL(),
                    text: "©️無名鯖 | setuna/Soso"
                },
            }]
        })
    } else if (type == "serverdeaf") {
        member.guild.channels.cache.get(config.voicemessages).send({
            embeds: [{
                color: 0x79bbff,
                title: member.user.tag,
                description: `\`${member.user.tag}\`が\`${channel.name}\`にて${state?"サーバーからスピーカーミュートされました":"サーバーからのスピーカーミュートが解除されました"}`,
                timestamp: new Date(),
                thumbnail: {
                    url: member.user.avatarURL()
                },
                footer: {
                    icon_url: member.guild.iconURL(),
                    text: "©️無名鯖 | setuna/Soso"
                },
            }]
        })
    } else if (type == "servermute") {
        member.guild.channels.cache.get(config.voicemessages).send({
            embeds: [{
                color: 0x79bbff,
                title: member.user.tag,
                description: `\`${member.user.tag}\`が\`${channel.name}\`にて${state?"サーバーからミュートされました":"サーバーからのミュートが解除されました"}`,
                timestamp: new Date(),
                thumbnail: {
                    url: member.user.avatarURL()
                },
                footer: {
                    icon_url: member.guild.iconURL(),
                    text: "©️無名鯖 | setuna/Soso"
                },
            }]
        })
    }
}