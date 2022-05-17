import { PrismaClient } from '@prisma/client'
import { userOrGuest, user, password } from './prompts' 

const loginOrGuest = async () => {
	let res = await userOrGuest()
	if (res == 'Guest') {

	} else if (res == 'User') {
		let user_login = await user()
		let password_login = await password()
		console.log(user_login)
		console.log(password_login)
	} else {
		
	}
}

export { loginOrGuest }
