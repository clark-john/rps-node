import { test, expect } from '@jest/globals'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
	try {
		// simple db operation to test db activity
		let db = await prisma.history.findMany()
		return true
	} catch(err) {
		throw err
	} 
}

test('Connect Database', async () => {
	expect(await main()).toBe(true)
})
