//node modules
const fs = require("fs")

//variables
let random
let current_word
let word_completed
let timer
let time
let key
let word_type

let space = 0
let starter = 0
let score = 0
let correct = 0
let wrong = 0

let word_box = document.getElementById("word_box")
let word_text = document.getElementById("word_text")
let score_text = document.getElementById("score_text")
let time_text = document.getElementById("time_text")
let correct_text = document.getElementById("correct_text")
let wrong_text = document.getElementById("wrong_text")
let history_box = document.getElementById("history_box")

let before_start = document.getElementById("before_start")
let after_start = document.getElementById("after_start")

let start = () => {
	//select word type
	word_box.value = ""

	history_box.style.top = "75px"

	let word_select = document.getElementById("word_select").value

	if (word_select == 0) {
		key = cwh
		word_type = "Magyar szavak"
	} else if (word_select == 1) {
		key = chn
		word_type = "Magyar nevek"
	} else if (word_select == 2) {
		key = cwe
		word_type = "Angol szavak"
	} else if (word_select == 3) {
		key = cen
		word_type = "Angol nevek"
	}

	before_start.style.display = "none"
	after_start.style.display = "block"

	//random word
	random = 0
	random = Math.floor(Math.random() * key.length)
	current_word = key[random]
	console.log(current_word)
	word_text.innerText = current_word

	if (starter == 0) {
		start_timer()
		word_box.focus()

		let time_select = document.getElementById("time_select").value

		if (time_select == 0) {
			time = 30
		} else if (time_select == 1) {
			time = 60
		} else if (time_select == 2) {
			time = 90
		} else if (time_select == 3) {
			time = 120
		}

		starter++
	}
}

let start_timer = () => {
	timer = setInterval(() => {
		time--

		time_text.innerText = time

		if (time == 0) {
			word_box.value = ""
			word_box.blur()
			clearInterval(timer)
			history()
		}

		console.log(time)
	}, 1000)
}

word_box.addEventListener("keypress", (k) => {
	if (k.key == "Enter" || k.key == " ") {
		word_completed = word_box.value

		if (k.key == " ") {
			if (space !== 0) {
				word_completed = word_completed.substring(1)
				console.log(`-${word_completed}-`)
			}
			space++
		}

		if (current_word == word_completed) {
			score++
			score_text.innerText = score
			word_box.value = ""

			score_text.style.color = "green"
			word_text.style.color = "green"
			correct_text.style.color = "green"
			wrong_text.style.color = "green"

			correct++
			correct_text.innerText = correct
			setTimeout(() => {
				score_text.style.color = "white"
				word_text.style.color = "white"
				correct_text.style.color = "green"
				wrong_text.style.color = "red"
			}, 500)

			start()
		} else if (current_word !== word_completed) {
			score--
			score_text.innerText = score
			word_box.value = ""

			score_text.style.color = "red"
			word_text.style.color = "red"
			correct_text.style.color = "red"
			wrong_text.style.color = "red"

			wrong++
			wrong_text.innerText = wrong
			setTimeout(() => {
				score_text.style.color = "white"
				word_text.style.color = "white"
				correct_text.style.color = "green"
				wrong_text.style.color = "red"
			}, 500)

			start()
		}
	}
})

let restart = () => {
	before_start.style.display = "block"
	after_start.style.display = "none"

	history_box.style.top = "250px"

	random = 0
	current_word = 0
	word_completed = 0
	space = 0

	time = 0
	starter = 0
	score = 0
	correct = 0
	wrong = 0

	word_text.innerText = "Szó"
	score_text.innerText = "Pontszám"
	time_text.innerText = "Idő"
	correct_text.innerText = "0"
	wrong_text.innerText = "0"

	clearInterval(timer)

	console.log("FORCE RELOAD COMPLETED!!!")
}

let history = () => {
	let content = `Szavak: ${word_type} | Pontszám: ${score} Helyes: ${correct} Helytelen: ${wrong}`

	let filepath = "history.md"

	fs.appendFileSync("history.md", `\n ${content}`, (err) => {
		if (err) {
			console.log("bazd meg")
		} else {
			console.log("kész")
		}
	})

	fs.readFile(filepath, "utf-8", (err, data) => {
		if (err) {
			console.log("bazd meg2")
		} else {
			console.log("kész2")
			history_box.value = data
		}
	})

	random = 0
	current_word = 0
	word_completed = 0

	time = 0
	starter = 0
	score = 0
	correct = 0
	wrong = 0

	word_text.innerText = "Szó"
	score_text.innerText = "Pontszám"
	time_text.innerText = "Idő"
	correct_text.innerText = "0"
	wrong_text.innerText = "0"

	console.log("RELOAD COMPLETED!!!")
}
