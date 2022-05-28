import { historyClearConfirmation as hCC } from './prompts'
import { green } from 'colorette'
import { writeFileSync } from 'fs'
import { History } from '../utils/Schema'
import { connectDB } from '../utils/connectDB'

const clearHist = async (confirm_needed: boolean, userLoggedIn: string) => {
	await connectDB()
	if (confirm_needed) {
		let list = await History.find({ playedBy: userLoggedIn })
		
		let confirm = await hCC()

		if (confirm){
			if (list.length == 0) {
				console.log("You've already cleared your history.")
			}
			else {
				await History.deleteMany({ playedBy: userLoggedIn })
				console.log(green("History cleared successfully."))
			}
		} else {
			console.log("History clearing aborted.")
		}
	} else {
		await History.deleteMany({})
	}
}

const viewHist = async () => {
	await connectDB()
	const gameHistory = await History.find()
	writeFileSync('./src/hist/history.json', JSON.stringify(gameHistory))
	return gameHistory
}

const histSize = async () => {
	await connectDB()
	let histsizeQuery = await History.find()
	let histsize = histsizeQuery.length
	return histsize
}

export { viewHist, clearHist, histSize }
