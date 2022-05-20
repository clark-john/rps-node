import { red } from 'colorette'
import { PrismaClient } from '@prisma/client'
import sha1 from 'sha1' 
import { 
	userOrGuest, 
	userPassword, 
	registerNamePassword,
	confirmPassword,
	someDetails
} from './prompts'

const prisma = new PrismaClient()

const loginOrGuest = async () => {
	let data: any
	let res = await userOrGuest()
	if (res == 'Guest') {
		data = "Guest"
	}
	else if (res == 'User') {
		let userAndPassword: any
		let fetchUsers = await prisma.user.findMany()
		if (fetchUsers.length == 0) {
			console.log("No users")
		} else {
			const usersArray = await prisma.user.findMany()
			userAndPassword = await userPassword()
			
			const usersList = []
			for (let x = 0; x < usersArray.length; x++){
				usersList.push(usersArray[x].name as never) 
			}

			const findme = usersList.includes(userAndPassword.user as never)

			if ( !findme ){
				process.exit(0)
			} else {
				let pw = await prisma.user.findFirst({
					where: {
						name: userAndPassword.user
					}
				})
				if (!pw) {}
 				else {
					if (sha1(userAndPassword.password) == pw.password) {
					} else {
						console.log(red("Incorrect password"))
						process.exit()
					}
				}
			}
		}
		data = userAndPassword.user
	} else {
		let nameAndPass: any
		while (true) {
			nameAndPass = await registerNamePassword()
			let confirmPass = await confirmPassword()
			if (nameAndPass.password != confirmPass) {
				console.log(red("Passwords doesn't match."))
			} else {
				nameAndPass.password = sha1(nameAndPass.password)
				break
			}
		}
		let details = await someDetails()
		await prisma.user.create({
			data: {
				name: nameAndPass.name,
				password: nameAndPass.password,
				birthdate: Number(details.birthdate),
				birthmonth: details.birthmonth,
				birthyear: details.birthyear,
				gender: details.gender,
				highscore: 0
			}
		})
		data = nameAndPass.name
	}
	return data
}

export { loginOrGuest }
