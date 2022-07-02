import 'module-alias/register'
import { yellow, magenta, green, bold, red } from 'colorette'
import { play } from './rps'
import { tui } from './tui'
import { gameInit } from './utils/gameInit'
import { loginOrGuest } from './user/Login'
import { getConfigData } from './utils/getConfigData'
import { onCancel } from './utils/onCancel'
import os from 'os'
import repl from 'repl'
import prompts from 'prompts'
import isWindows from 'is-windows'

let system = os.type()
const node_version = process.version
if (isWindows()){
	system = 'Windows'
} else if (system == 'Darwin'){
	system = 'Mac OS'
}

const config = getConfigData()

process.title = config.game.window_title;

// where prisma is used
(async () => {
	let userLoggedIn = await loginOrGuest()
	if (userLoggedIn == 'Guest') {
		console.log(yellow("You're not logged in. To save your high score, please log in or create a new account."))
	} else {
		console.log(green(bold(`You're logged in as ${userLoggedIn}`)))
	}
	while (true) {
		await gameInit()
		console.log(green("Welcome to rps-node!"))
		console.log(yellow(`You're using ${system} as of now.`))
		console.log(yellow(bold(`You're using Node ${node_version}`)))
		console.log("Wanna play? Type 'y' to start the game or type 'n' if you're exiting.")
		console.log(magenta("Type \"cmds\" for special commands."))

		let ans = await prompts({
			type: 'text',
			name: 'ans',
			message: ''
		}, { onCancel })
		let res = ans.ans

		if (res == 'y') {
			await play(userLoggedIn)
			break
		} else if (res == 'n' || res == 'exit') {
			console.log("Exiting...")
			process.exit()
		} else if (res == 'cmds'){
			console.log('commands area')
			await tui(userLoggedIn)
			break
		} else if (res == 'repl') {
			repl.start('> ')
			break
		} 
		else {
			console.log(red("invalid"))
		}
	}
})()
