import { Event } from "../utils/index.js";
import ready from "./ready.js";
import message from "./message.js";
import interactionCreate from "./interactionCreate.js";

export default [ready, message, interactionCreate] as Event[];
