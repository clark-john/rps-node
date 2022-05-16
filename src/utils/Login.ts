import { PrismaClient } from '@prisma/client'
import { userOrGuest } from './prompts' 

const loginOrGuest = async () => {
	await userOrGuest()
}

export { loginOrGuest }
