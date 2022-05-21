import ini from 'ini'
import { readFileSync } from 'fs'

const getIniData = () => {
	const inipath = './src/rps.ini'
	let config = ini.parse(readFileSync(inipath, 'utf8'))

	return config
}

export { getIniData }
