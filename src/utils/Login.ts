import { red } from 'colorette'
import { PrismaClient } from '@prisma/client'
import { 
	userOrGuest, 
	userPassword, 
	registerNamePassword,
	confirmPassword,
	someDetails
} from './prompts' 

const prisma = new PrismaClient()

const loginOrGuest = async () => {
	let res = await userOrGuest()
	if (res == 'Guest') {

	} else if (res == 'User') {
		let fetchUsers = await prisma.user.findMany()
		if (fetchUsers.length == 0) {
			console.log("No users")
		} else {
			const usersArray = await prisma.user.findMany()
			let userAndPassword = await userPassword()
			
			const usersList = []
			for (let x = 0; x < usersArray.length; x++){
				usersList.push(usersArray[x].name as never) 
			}

			const findme = usersList.find(item => item == userAndPassword.user)

			if ( !findme ){
				console.log("User doesn't exist.")
			} else {
				console.log("User exists")
			}
		}

	} else {
		let nameAndPass
		while (true) {
			nameAndPass = await registerNamePassword()
			let confirmPass = await confirmPassword()
			if (nameAndPass.password != confirmPass) {
				console.log(red("Passwords doesn't match."))
			} else {
				break
				return true
			}
		}
		let details = await someDetails()
		await prisma.user.create({
			data: {
				name: nameAndPass.name,
				password: nameAndPass.password,
				birthdate: details.birthdate,
				birthmonth: details.birthmonth,
				birthyear: details.birthyear,
				gender: details.gender,
				highscore: 0
			}
		})
	}
}

export { loginOrGuest }
