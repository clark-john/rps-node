import { red, yellow } from 'colorette'
import { PrismaClient } from '@prisma/client'
import { pushLogin } from './sendLoginToJSON'
import { userPassword, rememberPassword } from './prompts'
import { shaEncode } from './Sha256'

const prisma = new PrismaClient()

const userLogin = async () => {
	let userAndPassword: any
	const usersArray = await prisma.user.findMany()
	userAndPassword = await userPassword()

	const usersList = []
	for (let x = 0; x < usersArray.length; x++){
		usersList.push(usersArray[x].name as never) 
	}

	const findme = usersList.includes(userAndPassword.user as never)

	if ( !findme ){
		console.log(`${yellow(userAndPassword.user)} doesn't exist.`)
		process.exit(0)
	} else {
		let pw = await prisma.user.findFirst({
			where: {
				name: userAndPassword.user
			}
		})
		if (pw) {
			if (shaEncode(userAndPassword.password) == pw.password) {
				let rememberPass = await rememberPassword()
				pushLogin(userAndPassword.user, rememberPass)
			} else {
				console.log(red("Incorrect password"))
				process.exit()
			}
		}
	}
	return userAndPassword.user
}

export { userLogin }