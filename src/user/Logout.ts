import { rm } from 'fs/promises'
import { resolve } from 'path'
import { bold, green } from 'colorette'

const Logout = async () => {
	await rm(resolve(__dirname, "./.login.json"), { force: true })
	.then(() => {
		console.log(bold(green("Logged out successfully")))
	})
	.catch(err => {
		throw err
	})
}

export { Logout }