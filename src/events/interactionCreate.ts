import { event, Events } from "../utils/index.js";

const liveTags: string[] = [];

const formatTag = (tag: string) => tag.replace(/_/g, "`_`"); // _ in @ in discord message links []() are auto-removed
async function getLiveTags() {
	try {
		const response = await fetch(
			"https://terriverse.vercel.app/api/who-live/spinoffs"
		);
		const data = await response.json();
		liveTags.splice(0, liveTags.length); // clear array
		for (let tag in data.tagInfo)
			if (data.tagInfo[tag]) liveTags.push("@" + tag);
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

export default event(
	Events.InteractionCreate,
	({ log, client }, interaction) => {
		if (!interaction.isChatInputCommand()) return;
		if (interaction.commandName === "spinoffs") {
			interaction.reply("...");
			getLiveTags().then(() => {
				let msg = "";
				if (!liveTags.length) msg = "terriverse is sleep";
				liveTags.forEach((tag) => {
					msg += `[${formatTag(
						tag
					)}](<https://tiktok.com/${tag}/live>) `;
				});
				interaction.channel?.send(msg);
			});
		}
	}
);
