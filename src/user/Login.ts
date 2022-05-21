import { red, yellow } from 'colorette'
import { PrismaClient } from '@prisma/client'
import { pushLogin, getLogin } from './sendLoginToJSON'
import { readFileSync } from 'fs'
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
	let res = await userOrGuest()

	if (await !getLogin()) {
		if (res == 'Guest') {
			return "Guest"
		}
		else if (res == 'User') {
			let userAndPassword: any
			let fetchUsers = await prisma.user.findMany()
			if (fetchUsers.length == 0) {
				console.log("No users")
			} 
			else {
				const usersArray = await prisma.user.findMany()
				userAndPassword = await userPassword()
				
				const usersList = []
				for (let x = 0; x < usersArray.length; x++){
					usersList.push(usersArray[x].name as never) 
				}

				const findme = usersList.includes(userAndPassword.user as never)
				console.log(getLogin())

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
						if (sha1(userAndPassword.password) == pw.password) {
							pushLogin(userAndPassword.user)
						} else {
							console.log(red("Incorrect password"))
							process.exit()
						}
					}
				}
			}
			return userAndPassword.user
		} else if (res == "Exit") {
			process.exit(0)
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
			pushLogin(nameAndPass.name)
			return nameAndPass.name
		}
	} else {
		if (res == 'Guest') {
			return res
		} else {
			return await getLogin()
		}
	}
}

const whoAmI = async () => {
	return await getLogin()
}

export { loginOrGuest, whoAmI }
