import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const autoIncrement = async () => {
	let lookForGameNumber = await prisma.history.findMany()
	let last
	if (lookForGameNumber.length == 0){
		last = 1
	} else {
		let listLength = lookForGameNumber.length - 1
		last = lookForGameNumber[listLength].gamenumber
		last++
	}
	
	const number_return = last
	return number_return
}

export { autoIncrement }