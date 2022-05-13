import ini from 'ini'
import { readFileSync } from 'fs'
import { locateFile } from './fileLocator'

const getIniData = () => {
	const inipath = locateFile('src/rps.ini')
	let config = ini.parse(readFileSync(inipath, 'utf8'))

	return config
}

export { getIniData }
