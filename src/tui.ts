import { log } from 'console'
import { red, green } from 'colorette'
import { prompt } from 'inquirer' 
import { viewHist, clearHist } from './cmds/History'

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
			viewHist()
		} else if (cmd == 'clearhist') {
			await clearHist()
			log(green("History cleared successfully."))
		} else {
			log(red(""))
		}
	}
}

export default tui