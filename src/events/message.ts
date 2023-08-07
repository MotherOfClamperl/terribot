import { event, Events } from "../utils/index.js";

export default event(Events.MessageCreate, ({ log }, msg) => {
	// onMessage 'ping' => send 'pong' to chat
	if (msg.content === "ping") {
		return msg.reply("pong");
	}
});
