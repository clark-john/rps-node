import { PrismaClient } from '@prisma/client'
import { historyClearConfirmation as hCC } from './prompts'
import { green } from 'colorette'
import { writeFile, rm } from 'fs/promises'
import { resolve } from 'path'

const prisma = new PrismaClient()

const clearHist = async (confirm_needed: boolean, userLoggedIn: string) => {
	if (confirm_needed) {
		let list = await prisma.history.findMany({
			where: {
				playedBy: userLoggedIn
			}
		})
		
		let confirm = await hCC()

		if (confirm){
			if (list.length == 0) {
				console.log("You've already cleared your history.")
			}
			else {
				await prisma.history.deleteMany({
					where: {
						playedBy: userLoggedIn
					}
				})
				console.log(green("History cleared successfully."))
				await rm(resolve(__dirname, './history.json'))
			}
		} else {
			console.log("History clearing aborted.")
		}
	} else {
		await prisma.history.deleteMany({})
	}
}

const viewHist = async () => {
	const gameHistory = await prisma.history.findMany()
	await writeFile(resolve(__dirname, './history.json'), JSON.stringify(gameHistory))
	return gameHistory
}

const histSize = async () => {
	let histsizeQuery = await prisma.history.findMany()
	let histsize = histsizeQuery.length
	return histsize
}

export { viewHist, clearHist, histSize }
