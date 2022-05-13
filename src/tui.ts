import { log } from 'console'
import { red, green } from 'colorette'
import { prompt } from 'inquirer' 
import { viewHist, clearHist, histSize } from './cmds/History'
import { historyClearConfirmation as hCC } from './utils/prompts' 

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
			clearHist(true)
		} else if (cmd == 'histsize') {
			log(await histSize())
		}
		else {
			log(red(`Command ${cmd} doesn't exist.`))
		}
	}
}

export default tui