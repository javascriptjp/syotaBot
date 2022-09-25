const config = require("./config.json")
module.exports = (type, member) => {
    if(type == "join") {
        member.guild.channels.cache.get(config.joinmessages).send({embeds: [{
            color: "79bbff",
            title: member.user.tag,
            description: `\`${member.user.tag}\`がサーバーへ参加しました`,
            timestamp: new Date(),
            thumbnail: {url: member.user.avatarURL()},
            footer: {
                icon_url: member.guild.iconURL(),
                text: "©️無名鯖 | setuna/Soso"
            },
        }]})
    }else if(type == "leave") {
        member.guild.channels.cache.get(config.joinmessages).send({embeds: [{
            color: "79bbff",
            title: member.user.tag,
            description: `\`${member.user.tag}\`がサーバーから退出しました`,
            timestamp: new Date(),
            thumbnail: {url: member.user.avatarURL()},
            footer: {
                icon_url: member.guild.iconURL(),
                text: "©️無名鯖 | setuna/Soso"
            },
        }]})
    }
}