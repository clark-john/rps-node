import { PrismaClient } from '@prisma/client'
import { log } from 'console'
import { historyClearConfirmation as hCC } from '../utils/prompts'
import { green } from 'colorette'

const prisma = new PrismaClient()

const clearHist = async (confirm_needed) => {
	if (confirm_needed) {
		let confirm = await hCC()
		if (confirm){
			await prisma.history.deleteMany({})
			log(green("History cleared successfully."))
		} else {
			log("History clearing aborted.")
		}
	} else {
		await prisma.history.deleteMany({})
	}
}

const viewHist = async () => {
	const gameHistory = await prisma.history.findMany()
	return gameHistory
}

const histSize = async () => {
	let histsizeQuery = await prisma.history.findMany()
	let histsize = histsizeQuery.length
	return histsize
}

export { viewHist, clearHist, histSize }
