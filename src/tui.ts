import { red, bold, magenta } from 'colorette'
import { prompt } from 'inquirer' 
import { viewHist, clearHist, histSize } from './hist/History'
import { editProfile } from './user/editProfile'
import { readFileSync } from 'fs'
import mongoose from 'mongoose'
import slugify from 'slugify'
import { 
	nameToSlugify 
} from './hist/prompts' 
import { whoAmI } from './user/Login'
import { Logout } from './user/Logout'

const commands = readFileSync('./src/commands.json', 'utf8')
const commands_list = JSON.parse(commands)

const tui = async (userLoggedIn: string) => {
	// tui
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

		// commmands
		if (cmd == 'exit') {
			process.exit()
		} 
		else if (cmd == 'viewhist') {
			console.log(await viewHist().finally(() => {mongoose.disconnect()}))
		} 
		else if (cmd == 'clearhist') {
			await clearHist(true, userLoggedIn).finally(() => {mongoose.disconnect()})
		} 
		else if (cmd == 'histsize') {
			console.log(await histSize().finally(() => {mongoose.disconnect()}))
		} 
		else if (cmd == 'slugify') {
			let name = await nameToSlugify()
			console.log(slugify(name))
		} 
		else if (cmd == 'list') {
			for (let x = 0; x < commands_list.length; x++) {
				console.log(bold(magenta(commands_list[x].command))+" - "+commands_list[x].usage)
			}
		} 
		else if (cmd == 'cls' || cmd == 'clear'){
			console.clear()
		}
		else if (cmd == 'editprofile'){
			await editProfile(userLoggedIn).finally(() => {mongoose.disconnect()})
		}
		else if (cmd == 'whoami'){
			if (userLoggedIn != 'Guest') {console.log(await whoAmI())}
		}
		else if (cmd == 'logout'){
			await Logout()
		}
		else {
			console.log(red(`Command ${cmd} doesn't exist. Type "list" for a list of commands.`))
		}
	}
}

export { tui }