import { getLogin } from './sendLoginToJSON'
import { onCancel } from '../utils/onCancel'
import { Details } from '../utils/interfaces'
import prompts from 'prompts'

const NameValidationPattern =  /^[\w]{3,}$/
const PasswordValidationPattern = /^[\w]{8,}$/
const BirthDateValidationPattern = /^([1-9]|[12][\d]|3[01])$/

const nameInvalidErr = "Name must have equal or more than 3 characters."
const passwordInvalidErr = "Password must have equal or more than 8 characters."
const birthdateInvalidErr = "Birth date must be from 1 to 31."

// Login related things
const userOrGuest = async () => {
	let user = await getLogin() == null ? '' : await getLogin()
	let response = await prompts({
		type: "select",
		name: "login",
		message: "Login as user or guest? Don't have an account? Choose \"Register new one\"",
		"choices": [
			{ title: "Guest", value: "Guest" },
			{ title: `User ${user.name ? `(${user.name})` : ''}`, value: "User" },
			{ title: "Register new one", value: "Register new one" },
			{ title: "Logout", value: "Logout" },
			{ title: "Exit", value: "Exit" }
		]
	})
	return response.login
}

const userPassword = async () => {
	let response = await prompts(
		[
			{
				type: "text",
				name: "user",
				message: "User:"
			},
			{
				type: "password",
				name: "password",
				message: "Password:"
			}
		], { onCancel }
	)
	return response
}

const rememberPassword = async () => {
	let response = await prompts({
		type: "confirm",
		name: "confirmation",
		message: "Remember password?"
	})
	return response.confirmation
}

// register related

const registerNamePassword = async () => {
	let response = await prompts(
		[
			{
				type: "text",
				name: "name",
				message: "What's your name?",
				validate: name => name.match(NameValidationPattern) ? true : nameInvalidErr
			},
			{
				type: "password",
				name: "password",
				message: "Enter your password:",
				validate: password => password.match(PasswordValidationPattern) ? true : passwordInvalidErr 
			}
		], { onCancel }
	)
	return response
}

const confirmPassword = async () => {
	let response = await prompts({
		type: "password",
		name: "password",
		message: "Confirm password",
	}, { onCancel })
	return response.password
}

const someDetails = async () => {
	let response = await prompts(
		[
			{
				type: "list",
				name: "birthmonth",
				message: "Birth month",
				choices: [
					{ title: "January", value: "January" }, 
					{ title: "February", value: "February" }, 
					{ title: "March", value: "March" }, 
					{ title: "April", value: "April" }, 
					{ title: "May", value: "May" }, 
					{ title: "June", value: "June" }, 
					{ title: "July", value: "July" }, 
					{ title: "August", value: "August" }, 
					{ title: "September", value: "September" }, 
					{ title: "October", value: "October" }, 
					{ title: "November", value: "November" }, 
					{ title: "December", value: "December" }
				]
			},
			{
				type: "text",
				name: "birthdate",
				message: "Birth date (1-31)",
				validate: birthdate => birthdate.match(BirthDateValidationPattern) ? true : birthdateInvalidErr
			},
			{
				type: "number",
				name: "birthyear",
				message: "Birth Year"
			},
			{
				type: "list",
				name: "gender",
				message: "Gender",
				choices: [
					{ title: "Male", value: "Male" },
					{ title: "Female", value: "Female" }
				]
			}
		], { onCancel }
	)
	return response
}

// updating 
const newName = async () => {
	let newname = await prompts({
		type: "text",
		name: "newname",
		message: "New name:",
		validate: n => n.match(NameValidationPattern) ? true : nameInvalidErr
	}, { onCancel })
	return newname.newname
}
const newPassword = async () => {
	let newpassword = await prompts({
		type: "password",
		name: "newpw",
		message: "New password:",
		validate: pw => pw.match(PasswordValidationPattern) ? true : passwordInvalidErr
	}, { onCancel })
	let confirmPassword = await prompts({
		type: "password",
		name: "newpw",
		message: "Confirm password:",
	}, { onCancel })
	if (newpassword != confirmPassword){
		console.log("Passwords doesn't match.")
		return false
	} else {
		console.log("Password updated successfully.")
		return newpassword.newpw
	}
}
const newBirthMonth = async () => {
	let newbirthmonth = await prompts({
		type: "select",
		name: "birthmonth",
		message: "Choose new birth month",
		choices: [
			{ title: "January", value: "January" }, 
			{ title: "February", value: "February" }, 
			{ title: "March", value: "March" }, 
			{ title: "April", value: "April" }, 
			{ title: "May", value: "May" }, 
			{ title: "June", value: "June" }, 
			{ title: "July", value: "July" }, 
			{ title: "August", value: "August" }, 
			{ title: "September", value: "September" }, 
			{ title: "October", value: "October" }, 
			{ title: "November", value: "November" }, 
			{ title: "December", value: "December" }
		]
	}, { onCancel })
	return newbirthmonth.birthmonth
}
const newBirthDate = async () => {
	let newbirthdate = await prompts({
		type: "text",
		name: "birthdate",
		message: "Birth date (1-31)",
		validate: bdate => bdate.match(BirthDateValidationPattern) ? true : birthdateInvalidErr
	}, { onCancel })
	return newbirthdate.birthdate
}
const newBirthYear = async () => {
	let newbirthyear = await prompts({
		type: "number",
		name: "birthyear",
		message: "Enter new birth year:"
	}, { onCancel })
	return newbirthyear.birthyear
}

// what to edit and its interface

const whatToEdit = async (details: Details) => {
	let whattoedit =  await prompts({
		type: "select",
		name: "edit",
		message: "Edit profile | What to edit?",
		choices: [
			{ 
				title: `Name (currently ${details.name})`, 
				value: "Name" 
			},
			{
				title: "Password",
				value: "Password"
			},
			{
				title: `Birth date (currently ${details.bdate})`,
				value: "Birth date"
			},
			{
				title: `Birth month (currently ${details.bmonth})`,
				value: "Birth month"
			},
			{
				title: `Birth year (currently ${details.byear})`,
				value: "Birth year"
			}
		]
	}, { onCancel })
	return whattoedit.edit
}

// exporting
export { 
	userOrGuest,
	userPassword,
	rememberPassword,
	registerNamePassword,
	confirmPassword,
	someDetails,
	newName,
	newPassword,
	newBirthMonth,
	newBirthDate,
	newBirthYear,
	whatToEdit,
}