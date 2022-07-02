import { test, expect } from '@jest/globals' // typescript preferred this ig
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// if this thing is not successful, your database may be turned off.
const connectDB = async () => {
	try {
		let db = await prisma.history.findMany()
		return true
	} catch(err) {
		return false
	} 
}

test('Connect Database', async () => {
	expect(await connectDB()).toBe(true)
})

// still thinking others to test