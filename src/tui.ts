import { log } from 'console'
import { red, green, bold, magenta } from 'colorette'
import { prompt } from 'inquirer' 
import { viewHist, clearHist, histSize } from './cmds/History'
import { locateFile } from './utils/fileLocator'
import { readFileSync } from 'fs'
import slugify from 'slugify'
import { 
	historyClearConfirmation as hCC,
	nameToSlugify 
} from './utils/prompts' 

const commands = readFileSync(locateFile('./src/cmds/commands.json'), 'utf8')
const commands_list = JSON.parse(commands)

const tui = async () => {
	while (true) {
		let cmd = await prompt(
			[
				{
					"type": "input",
					"name": "cmd",
					"message": "> "
				}
			]
		).then(ans => {
			ans = ans.cmd
			return ans
		}).catch(err => {
			throw err
		})
		if (cmd == 'exit') {
			process.exit()
		} else if (cmd == 'viewhist') {
			log(await viewHist())
		} else if (cmd == 'clearhist') {
			await clearHist(true)
		} else if (cmd == 'histsize') {
			log(await histSize())
		} else if (cmd == 'slugify') {
			let name = await nameToSlugify()
			console.log(slugify(name))
		} else if (cmd == 'list') {
			for (let x = 0; x < commands_list.length; x++) {
				console.log(bold(magenta(commands_list[x].command))+" - "+commands_list[x].usage)
			}
		} else if (cmd == 'cls' || cmd == 'clear'){
			console.clear()
		}
		else {
			log(red(`Command ${cmd} doesn't exist.`))
		}
	}
}

export default tui