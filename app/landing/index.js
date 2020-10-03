const { ipcMain } = require("electron")
const electron = require("electron")
const ipc = electron.ipcRenderer

let hu = () => {
	ipc.send("hu")
}

let en = () => {
	ipc.send("en")
}
