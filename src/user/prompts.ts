import { prompt } from 'inquirer'
import { NameValidation, PasswordValidation, BirthDateValidation } from './validations'

// Login related things
const userOrGuest = () => {
	let response: Promise<string> = prompt(
		[
			{
				"type": "list",
				"name": "login",
				"message": "Login as user or guest? Don't have an account? Choose \"Register new one\"",
				"choices": [
					"Guest",
					"User",
					"Register new one",
					"Exit"
				]
			}
		]
	).then(res => {
		res = res.login
		return res
	}).catch(err => {
		throw err
	})
	return response
}

const userPassword = async () => {
	let response = await prompt(
		[
			{
				"type": "input",
				"name": "user",
				"message": "User:"
			},
			{
				"type": "password",
				"name": "password",
				"message": "Password:",
				"mask": true
			}
		]
	).then(res => {
		return res
	}).catch(err => {
		throw err
	})
	return response
}

// register related

const registerNamePassword = async () => {
	let response = await prompt(
		[
			{
				"type": "input",
				"name": "name",
				"message": "What's your name?",
				"validate": NameValidation
			},
			{
				"type": "password",
				"name": "password",
				"message": "Enter your password:",
				"mask": true,
				"validate": PasswordValidation
			}
		]
	).then(res => {
		return res
	}).catch(err => {
		throw err
	})
	return response
}

const confirmPassword = async () => {
	let response = await prompt(
		[
			{
				"type": "password",
				"name": "password",
				"message": "Confirm password",
				"mask": true
			}
		]
	).then(res => {
		res = res.password
		return res
	}).catch(err => {
		throw err
	})
	return response
}

const someDetails = async () => {
	let response = await prompt(
		[
			{
				"type": "list",
				"name": "birthmonth",
				"message": "Birth month",
				"choices": [
					"January", "February", "March", "April", "May", "June", 
					"July", "August", "September", "October", "November", "December"
				],
				"loop": false
			},
			{
				"type": "string",
				"name": "birthdate",
				"message": "Birth date (1-31)",
				"validate": BirthDateValidation
			},
			{
				"type": "number",
				"name": "birthyear",
				"message": "Birth Year"
			},
			{
				"type": "list",
				"name": "gender",
				"message": "Gender",
				"choices": ["Male","Female"]
			}
		]
	).then(res => {
		return res
	}).catch(err => {
		throw err
	})
	return response
}

// updating 
const newName = async () => {
	let newname = await prompt([{
		"type": "input",
		"name": "newname",
		"message": "New name:",
		"validate": NameValidation	
	}])
	return newname.newname
}
const newPassword = async () => {
	let newpassword = await prompt([{
		"type": "password",
		"name": "newpw",
		"message": "New password:",
		"validate": PasswordValidation,
		"mask": true
	}]).then(res => {
		return res.newpw
	})
	let confirmPassword = await prompt([{
		"type": "password",
		"name": "newpw",
		"message": "Confirm password:",
		"mask": true
	}])
	if (newpassword != confirmPassword){
		console.log("Passwords doesn't match.")
		return false
	} else {
		console.log("Password updated successfully.")
		return newpassword.newpw
	}
}
const newBirthMonth = async () => {
	let newbirthmonth = await prompt([{
		"type": "list",
		"name": "birthmonth",
		"message": "Choose new birth month",
		"choices": [
			"January", "February", "March", "April", "May", "June", 
			"July", "August", "September", "October", "November", "December"
		],
		"loop": false
	}])
	return newbirthmonth.birthmonth
}
const newBirthDate = async () => {
	let newbirthdate = await prompt([{
		"type": "string",
		"name": "birthdate",
		"message": "Birth date (1-31)",
		"validate": BirthDateValidation
	}])
	return newbirthdate.birthdate
}
const newBirthYear = async () => {
	let newbirthyear = await prompt([{
		"type": "number",
		"name": "birthyear",
		"message": "Enter new birth year:"
	}])
	return newbirthyear.birthyear
}

// what to edit and its interface
interface Details {
	name: string,
	password: string,
	bdate: number,
	bmonth: string, 
	byear: number
}

const whatToEdit = async (details: Details) => {
	let whattoedit =  await prompt([{
		"type": "list",
		"name": "edit",
		"message": "Edit profile | What to edit?",
		"choices": [
			`Name (currently ${details.name})`,
			"Password",
			`Birth date (currently ${details.bdate})`,
			`Birth month (currently ${details.bmonth})`,
			`Birth year (currently ${details.byear})`
		]
	}])
	return whattoedit.edit
}

// const main = async () => {
// }
// main()

// exporting
export { 
	userOrGuest,
	userPassword,
	registerNamePassword,
	confirmPassword,
	someDetails,
	newName,
	newPassword,
	newBirthMonth,
	newBirthDate,
	newBirthYear,
	whatToEdit
}
export default Details