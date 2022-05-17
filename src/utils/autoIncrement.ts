import { readFile, writeFile } from 'fs/promises'
import { locateFile } from './fileLocator'
import { PrismaClient } from '@prisma/client'

const { parse, stringify } = JSON
const jsonpath = './src/utils/increment.json'
const prisma = new PrismaClient()

const autoIncrement = async () => {
	let lookForGameNumber = await prisma.history.findFirst()

	const jsonfile = await readFile(locateFile(jsonpath), 'utf8')
	const inc = parse(jsonfile)
	if (lookForGameNumber == null) {
		inc.increment = 1
	} else {
		inc.increment++
	}
	const number_return = inc.increment
	await writeFile(locateFile(jsonpath), stringify(inc))
	return number_return
}

export { autoIncrement }