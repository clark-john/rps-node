import { rm } from 'fs/promises'
import { bold, green } from 'colorette'

const Logout = async () => {
	await rm('./src/user/.login.json', { force: true })
	.then(() => {
		console.log(bold(green("Logged out successfully")))
	})
	.catch(err => {
		throw err
	})
}

export { Logout }