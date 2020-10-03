const electron = require("electron")
const path = require("path")
const { app, BrowserWindow, Menu, shell } = require("electron")
const ipc = electron.ipcMain

let window0
let window1
let window2
let c0 = false
let c1 = false
let c2 = false

let createWindow = () => {
	window0 = new BrowserWindow({
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			nodeIntegration: true,
		},
	})

	window1 = new BrowserWindow({
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			nodeIntegration: true,
		},
	})

	window2 = new BrowserWindow({
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			nodeIntegration: true,
		},
	})

	window0.maximize()

	window1.hide()
	window2.hide()

	window0.loadFile("./app/landing/index.html")
	window1.loadFile("./app/hu/index.html")
	window2.loadFile("./app/en/index.html")

	window0.on("close", () => {
		app.quit()
	})

	window1.on("close", () => {
		app.quit()
	})

	window2.on("close", () => {
		app.quit()
	})
}

ipc.on("hu", () => {
	window1.maximize()
	window1.show()
	window0.hide()
})

ipc.on("en", () => {
	window2.maximize()
	window2.show()
	window0.hide()
})

app.whenReady().then(() => {
	createWindow()
	const template = [
		{
			label: "Fájl",
			submenu: [
				{
					label: "Kilépés",
					click: () => {
						app.quit()
					},
				},
				{
					type: "separator",
				},
				{
					label: "Nyelv váltás",
					click: () => {
						if (c2 == false) {
							window1.maximize()
							window2.maximize()
							window2.show()
							window1.hide()
							c2 = true
						} else {
							window2.maximize()
							window1.maximize()
							window1.show()
							window2.hide()
							c2 = false
						}
						console.log(`LG ${c2}`)
					},
				},
			],
		},
		{
			label: "Beállítások",
			submenu: [
				{
					label: "Teljesképernyő",
					click: () => {
						if (c0 == false) {
							window0.setFullScreen(true)
							window1.setFullScreen(true)
							window2.setFullScreen(true)
							c0 = true
						} else {
							window0.setFullScreen(false)
							window1.setFullScreen(false)
							window2.setFullScreen(false)
							c0 = false
						}
						console.log(`FC ${c0}`)
					},
				},
				{
					type: "separator",
				},
				{
					label: "Fejlesztői eszközök",
					click: () => {
						if (c1 == false) {
							window0.webContents.openDevTools()
							window1.webContents.openDevTools()
							window2.webContents.openDevTools()
							c1 = true
						} else {
							window0.webContents.closeDevTools()
							window1.webContents.closeDevTools()
							window2.webContents.openDevTools()
							c1 = false
						}
						console.log(`DT ${c1}`)
					},
				},
			],
		},
		{
			label: "Frissítés",
			submenu: [
				{
					label: "Névjegy",
					click: () => {
						shell.openExternal("https://www.levminer.com")
					},
				},
				{
					type: "separator",
				},
				{
					label: "Frissítés keresése",
					click: () => {
						shell.openExternal("https://github.com/Levminer/typr/releases")
					},
				},
			],
		},
	]

	const menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})
