import {
	ApplicationCommand,
	SlashCommandBuilder,
	TextBasedChannel,
} from "discord.js";
import { event, Events } from "../utils/index.js";

//"config"
const checkUpMinutes = 1.5; // setInterval(checkUp, x minutes)
const CHANNELNAME = "live👁"; // the name of the channel to send messages in

const checkUpT = checkUpMinutes * 60 * 1000;

let terriLiveTag = "";
const formatTag = (tag: string) => tag.replace(/_/g, "`_`"); // _ in @ in discord message links []() are auto-removed
async function getLiveTag() {
	try {
		const response = await fetch(
			"https://terriverse.vercel.app/api/who-live"
		);

		let data;
		try {
			data = await response.json();
		} catch (err) {
			data = { tagInfo: {} };
			const txt = await response.text();
			console.log("(ready.ts) couldn't parse: " + txt);
		}

		terriLiveTag = "";
		for (let tag in data.tagInfo) if (data.tagInfo[tag]) terriLiveTag = tag;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

export default event(Events.ClientReady, ({ log }, client) => {
	log(`Logged in as ${client.user.username}!`);

	function sendMsg(msg: string, channelName: string) {
		client.guilds.cache.forEach((guild) => {
			guild.channels.cache.forEach((channel) => {
				if (channel.name === channelName) {
					(channel as TextBasedChannel).send(msg);
				}
			});
		});
	}

	function checkUp() {
		console.log("checking up...");
		const terriWasAlreadyLive = terriLiveTag;
		getLiveTag().then(() => {
			if (terriLiveTag && !terriWasAlreadyLive)
				sendMsg(
					CHANNELNAME,
					`@everyone [@${formatTag(
						terriLiveTag
					)}](<https://tiktok.com/@${terriLiveTag}/live>)`
				);

			if (!terriLiveTag && terriWasAlreadyLive)
				sendMsg(
					`@${formatTag(terriWasAlreadyLive)} disconnected`,
					CHANNELNAME
				);
		});
	}

	// register commands
	(function () {
		function addCommand(name: string, desc: string) {
			const cmd = new SlashCommandBuilder()
				.setName(name)
				.setDescription(desc);
			client.application.commands.create(cmd);
		}
		client.application.commands.set([]); // clear cached commands & re-add
		addCommand("spinoffs", "which terriverse side characters are on live?");
		addCommand("terribot", "which of terri's alts are live?");
	})();

	setInterval(checkUp, checkUpT);
	checkUp();

	return;
});
