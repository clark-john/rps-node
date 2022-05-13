import { relative, join } from 'path'

const locateFile = (fileToLocate) => {
	const file = join(__dirname, relative(__dirname, fileToLocate))
	return file
}

export { locateFile }