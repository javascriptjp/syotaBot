const {
    setTimeout
} = require('timers/promises');
const ngram = require("./n-gram.js")
const UserMessageUtil = {}
const ServerMessageUtil = {}
const UserWarned = {}
module.exports = async (message) => {
    if (message.content.match(/@everyone/)) {
        if (UserWarned[message.author.id]) {
            message.member.ban()
            await message.delete()
            await setTimeout(3000);
            return true
        } else {
            UserWarned[message.author.id] = true
            const Reply_message = await message.channel.send("everyoneを使わないでください\nDo not use everyone!!")
            await message.delete()
            await setTimeout(3000);
            await Reply_message.delete();
        }
    } else if (message.content.match(/@here/)) {
        if (UserWarned[message.author.id]) {
            message.member.ban()
            await message.delete()
            await setTimeout(3000);
            return true
        } else {
            UserWarned[message.author.id] = true
            const Reply_message = await message.channel.send("hereを使わないでください\nDo not use here!!")
            await message.delete()
            await setTimeout(3000);
            await Reply_message.delete();
        }
    }
    if (UserMessageUtil[message.channel.id]) {
        if (Date.now() - UserMessageUtil[message.channel.id][message.author.id]["LastSendTime"] <= 800) {
            const Reply_message = await message.channel.send("スパムをしないでください\nDo not spam!!")
            await message.delete()
            await setTimeout(3000);
            await Reply_message.delete();
            UserMessageUtil[message.channel.id][message.author.id]["LastSendTime"] = Date.now()
            UserMessageUtil[message.channel.id][message.author.id]["LastSendMessage"] = message.content
            return true
        } else
        if (message.content == UserMessageUtil[message.channel.id][message.author.id]["LastSendMessage"]) {
            if (Date.now() - UserMessageUtil[message.channel.id][message.author.id]["LastSendTime"] <= 2000) {
                const Reply_message = await message.channel.send("スパムをしないでください\nDo not spam!!")
                await message.delete()
                await setTimeout(3000)
                await Reply_message.delete()
                UserMessageUtil[message.channel.id][message.author.id]["LastSendTime"] = Date.now()
                UserMessageUtil[message.channel.id][message.author.id]["LastSendMessage"] = message.content
                return true
            }
        }
        UserMessageUtil[message.channel.id][message.author.id]["LastSendTime"] = Date.now()
        UserMessageUtil[message.channel.id][message.author.id]["LastSendMessage"] = message.content
    } else {
        UserMessageUtil[message.channel.id] = {}
        UserMessageUtil[message.channel.id][message.author.id] = {}
        UserMessageUtil[message.channel.id][message.author.id]["LastSendTime"] = Date.now()
        UserMessageUtil[message.channel.id][message.author.id]["LastSendMessage"] = message.content
    }

    if (ServerMessageUtil[message.author.id]) {
        const bems = ngram.trigramify(ServerMessageUtil[message.author.id]["Content"]);
        const afms = ngram.trigramify(message.content)
        const res = ngram.relevance(bems, afms)
        if (res > 400) {
            ServerMessageUtil[message.author.id]["WarnLv"] += 0.6
        }
        if (res > 600) {
            ServerMessageUtil[message.author.id]["WarnLv"] += 2.5
        }
        if (res > 800) {
            ServerMessageUtil[message.author.id]["WarnLv"] += 5
        }
        if (res > 1000) {
            ServerMessageUtil[message.author.id]["WarnLv"] += 10
        }
        if (ServerMessageUtil[message.author.id]["WarnLv"] > 20) {
            const Reply_message = await message.channel.send("スパムをしないでください\nDo not spam!!")
            await message.delete()
            await setTimeout(3000)
            await Reply_message.delete()
            return true
        }
        ServerMessageUtil[message.author.id]["Content"] = message.content
        ServerMessageUtil[message.author.id]["LastSend"] = Date.now()
        ServerMessageUtil[message.author.id]["WarnLv"] = ServerMessageUtil[message.author.id]["WarnLv"] - 0.3
    } else {
        ServerMessageUtil[message.author.id] = {}
        ServerMessageUtil[message.author.id]["Content"] = message.content
        ServerMessageUtil[message.author.id]["LastSend"] = Date.now()
        ServerMessageUtil[message.author.id]["WarnLv"] = 0
    }
    return false
}