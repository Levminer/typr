//preload
const fs = require("fs")
const DiscordRPC = require("discord-urpc")

const uRPC = new DiscordRPC({ clientID: "734830504343240836", debug: true || false })
uRPC.on("ready", () => {
	const args = {
		pid: process.pid,
		activity: {
			state: "Trying to write quickly...",
			details: "Playing TYPR",
			timestamps: {
				start: new Date().getTime(),
			},
			instance: false,
		},
	}
	uRPC.send("SET_ACTIVITY", args)
})

console.log("preload running!")

let filepath = "history.md"

fs.readFile(filepath, "utf-8", (err, data) => {
	if (err) {
		console.log("bazd meg2")
	} else {
		console.log("kész2")
		history_box.value = data
	}
})
