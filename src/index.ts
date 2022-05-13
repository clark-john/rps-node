import { yellow, magenta, green, bold, red } from 'colorette'
import { error } from 'console'
import { prompt } from 'inquirer'
import { play } from './rps'
import { gameInit } from './utils/gameInit'
import os from 'os'
import repl from 'repl'
import tui from './tui'

let system = os.type()
const node_version = process.version
if (system == 'Windows_NT'){
	system = 'Windows'
} else if (system == 'Darwin'){
	system = 'Mac OS'
}

process.title = "Rock Paper Scissors - Node"

const question = () => {
	console.log(bold(green("Welcome to rps-python!")))
	console.log(yellow(`You're using ${system} as of now.`))
	console.log(yellow(bold(`You're using Node ${node_version}`)))
	console.log("Wanna play? Type 'y' to start the game or type 'n' if you're exiting.")
	console.log(magenta("Type \"cmds\" for special commands."))

	prompt([
		{
			'type': 'input',
			'name': 'ans',
			'message': '> '	
		}
	]).then(answer=>{
		let ans: string = answer.ans
		ans = ans.toLowerCase()
		if (ans == 'y') {
			play()
		} else if (ans == 'n' || ans == 'exit') {
			console.log("Exiting...")
			process.exit()
		} else if (ans == 'cmds'){
			tui()
			console.log('commands area')
		} else if (ans == 'repl') {
			repl.start('> ')
		}
		else {
			console.log(red("invalid"))
			question()
		}
	}).catch(err=>{error(err)})
}
question()
