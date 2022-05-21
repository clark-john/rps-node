import { rmSync } from 'fs'

const Logout = () => {
	rmSync('./src/user/.login.json', { force: true })
}

export { Logout }