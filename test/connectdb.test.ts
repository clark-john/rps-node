import { test, expect } from '@jest/globals'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
	try {
		let db = await prisma.history.findMany()
		// simple operation to test db activity
		return true
	} catch(err) {
		throw err
		return false
	} 
}

test('Connect Database', async () => {
	expect(await main()).toBe(true)
})
