//preload
const fs = require("fs")
const DiscordRPC = require("discord-urpc")
const { ipcMain } = require("electron")
const electron = require("electron")
const path = require("path")

const ipc = electron.ipcRenderer

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

const file_path0 = path.join(process.env.APPDATA, "/Levminer")
const file_path1 = path.join(process.env.APPDATA, "/Levminer/TYPR")

if (!fs.existsSync(file_path0)) {
	console.log("Folder 0 created!")
	fs.mkdirSync(path.join(process.env.APPDATA, "Levminer"))
}

if (!fs.existsSync(file_path1)) {
	console.log("Folder 1 created!")
	fs.mkdirSync(path.join(process.env.APPDATA, "Levminer", "TYPR"))
}

fs.readFile(path.join(file_path1, "history.md"), "utf-8", (err, data) => {
	if (err) {
		return console.log("The history.md fle dont exist!")
	} else {
		console.log("The history.md fle exist!")
		history_box.value = data
	}
})
