import { PrismaClient } from '@prisma/client'

const viewHist = async () => {
	const prisma = new PrismaClient()
	const gameHistory = await prisma.history.findMany()
	console.log(gameHistory)
}

const clearHist = async () => {
	const prisma = new PrismaClient()
	await prisma.history.deleteMany({})
}

export { viewHist, clearHist }
