import 'dotenv/config'
import mongoose from 'mongoose'
import { red, yellow } from 'colorette'
import { Logout } from './Logout'
import { pushLogin, getLogin } from './sendLoginToJSON'
import sha1 from 'sha1' 
import { User } from '../utils/Schema'
import { 
	userOrGuest, 
	userPassword, 
	registerNamePassword,
	confirmPassword,
	someDetails
} from './prompts'

const loginOrGuest = async () => {
	await mongoose.connect(process.env.MONGODB_URI as string)
	let res = await userOrGuest()

	if (await getLogin() == null) {
		if (res == 'Guest') {
			return "Guest"
		}
		else if (res.slice(0,4) == 'User') {
			let userAndPassword: any
			let fetchUsers = await User.find()
			if (fetchUsers.length == 0) {
				console.log("No users")
				process.exit()
			} 
			else {
				const usersArray = await User.find()
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
					let pw = await User.findOne({ name: userAndPassword.user })
					if (pw) {
						if (sha1(userAndPassword.password) == pw.password) {
							pushLogin(userAndPassword.user)
						} else {
							console.log(red("Incorrect password"))
							process.exit()
						}
					}
				}
				return userAndPassword.user
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
			new User()
			await User.create({				
				name: nameAndPass.name,
				password: nameAndPass.password,
				birthdate: Number(details.birthdate),
				birthmonth: details.birthmonth,
				birthyear: details.birthyear,
				gender: details.gender,
				highscore: 0
			})
			pushLogin(nameAndPass.name)
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
			return await getLogin()
		}
	}
}

const whoAmI = async () => {
	return await getLogin()
}

export { loginOrGuest, whoAmI }
