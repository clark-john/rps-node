import { yellow, magenta, green, bold, red } from 'colorette'
import { prompt } from 'inquirer'
import { play } from './rps'
import { tui } from './tui'
import { gameInit } from './utils/gameInit'
import { loginOrGuest } from './user/Login'
import { getIniData } from './utils/getIniData'
import os from 'os'
import repl from 'repl'

let system = os.type()
const node_version = process.version
if (system == 'Windows_NT'){
	system = 'Windows'
} else if (system == 'Darwin'){
	system = 'Mac OS'
}

const config = getIniData()

process.title = config.Game.window_title

const main = async () => {
	let userLoggedIn = await loginOrGuest()
	if (userLoggedIn == 'Guest') {
		console.log(yellow("You're not logged in. To save your high score, please log in or create a new account."))
	} else {
		console.log(green(bold(`You're logged in as ${userLoggedIn}`)))
	}
	while (true) {
		await gameInit()
		console.log(green("Welcome to rps-python!"))
		console.log(yellow(`You're using ${system} as of now.`))
		console.log(yellow(bold(`You're using Node ${node_version}`)))
		console.log("Wanna play? Type 'y' to start the game or type 'n' if you're exiting.")
		console.log(magenta("Type \"cmds\" for special commands."))

		let ans = await prompt([
			{
				'type': 'input',
				'name': 'ans',
				'message': '> '	
			}
		]).then(answer=>{
			answer = answer.ans.toLowerCase()
			return answer
		}).catch(err=>{throw err})

		if (ans == 'y') {
			await play(userLoggedIn)
			break
		} else if (ans == 'n' || ans == 'exit') {
			console.log("Exiting...")
			process.exit()
		} else if (ans == 'cmds'){
			console.log('commands area')
			await tui(userLoggedIn)
			break
		} else if (ans == 'repl') {
			repl.start('> ')
			break
		} 
		else {
			console.log(red("invalid"))
		}
	}
}
process.on('SIGINT', () => {
	console.log("Aborted")
})
main()
