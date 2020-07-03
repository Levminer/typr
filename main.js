const { app, BrowserWindow, Menu, shell, TouchBarScrubber } = require("electron")
const path = require("path")

let mainWindow
let c1 = 0
let c2 = 0

function createWindow() {
	// Create the browser window.

	mainWindow = new BrowserWindow({
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			nodeIntegration: true,
		},
	})

	mainWindow.maximize()
	/* 	mainWindow.resizable = false */

	//DEV
	/* mainWindow.webContents.openDevTools() */

	// and load the index.html of the app.
	mainWindow.loadFile("./app/app.html")
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
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
						app.quit()
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
						if (c1 == 0) {
							mainWindow.setFullScreen(true)
							c1++
						} else {
							mainWindow.setFullScreen(false)
							c1--
						}
						console.log(`FC ${c1}`)
					},
				},
				{
					type: "separator",
				},
				{
					label: "Fejlesztői eszközök",
					click: () => {
						if (c2 == 0) {
							mainWindow.webContents.openDevTools()
							c2++
						} else {
							mainWindow.webContents.closeDevTools()
							c2--
						}
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
						shell.openExternal("https://www.levminer.me")
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

	app.on("activate", function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
