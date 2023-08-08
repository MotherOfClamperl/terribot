import { event, Events } from "../utils/index.js";

export default event(
	Events.InteractionCreate,
	({ log, client }, interaction) => {
		if (!interaction.isChatInputCommand()) return;
		if (interaction.commandName === "spinoffs") {
			interaction.reply("Bot /spinoffs response!");
		}
	}
);
