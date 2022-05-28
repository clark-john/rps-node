import mongoose from 'mongoose'
import { History } from './Schema'
import 'dotenv/config'

const autoIncrement = async () => {
	await mongoose.connect(process.env.MONGODB_URI as string)
	let lookForGameNumber = await History.find()
	let last: number
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

// const autoIncrement = async () => {
	// let lookForGameNumber = await prisma.history.findMany()
	// let last: number
	// if (lookForGameNumber.length == 0){
	// 	last = 1
	// } else {
	// 	let listLength = lookForGameNumber.length - 1
	// 	last = lookForGameNumber[listLength].gamenumber
	// 	last++
	// }
	// const number_return = last
	// return number_return
// }
export { autoIncrement }