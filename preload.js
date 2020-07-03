//preload
const fs = require("fs")

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
