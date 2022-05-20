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
					"Register new one"
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

const main = async () => {
// console.log(await name_password())	
}
main()


// exporting
export { 
	userOrGuest,
	userPassword,
	registerNamePassword,
	confirmPassword,
	someDetails
}