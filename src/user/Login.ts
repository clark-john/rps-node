import { red } from 'colorette'
import { PrismaClient } from '@prisma/client'
import { Logout } from './Logout'
import { pushLogin, getLogin } from './sendLoginToJSON'
import { userLogin } from './userLogin'
import sha1 from 'sha1' 
import { 
	userOrGuest, 
	registerNamePassword,
	confirmPassword,
	someDetails,
	rememberPassword
} from './prompts'

const prisma = new PrismaClient()

const loginOrGuest = async () => {
	let res = await userOrGuest()

	if (await getLogin() == null) {
		if (res == 'Guest') {
			return "Guest"
		}
		else if (res == 'User') {
			let fetchUsers = await prisma.user.findMany()
			if (fetchUsers.length == 0) {
				console.log("No users")
			} 
			else {
				return await userLogin()
			}
		} else if (res == "Logout") {
			console.log("Currently no logged in users.")
			process.exit(0)
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
			let rememberPass = await rememberPassword()
			pushLogin(nameAndPass.name, rememberPass)
			return nameAndPass.name
		}
	} else {
		if (res == 'Guest') {
			return res
		} else if (res == 'Logout') {
			await Logout()
			process.exit(0)
		} else if (res == 'Exit') {
			process.exit(0)
		}	else {
			let user = await getLogin()
			if (!user.rememberPassword) {
				return await userLogin()
			} else {
				return user.name
			}
		}
	}
}

const whoAmI = async () => {
	let user = await getLogin()
	return user.name
}

export { loginOrGuest, whoAmI }
