import { TextBasedChannel } from "discord.js";
import { event, Events } from "../utils/index.js";

export default event(Events.ClientReady, ({ log }, client) => {
	function sendMsg(channelName: string, msg: string) {
		client.guilds.cache.forEach((guild) => {
			guild.channels.cache.forEach((channel) => {
				if (channel.name === channelName) {
					(channel as TextBasedChannel).send(msg);
				}
			});
		});
	}
	sendMsg("live👁", "@everyone hello world");
	return log(`Logged in as ${client.user.username}!`);
});
