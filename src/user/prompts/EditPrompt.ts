import prompts from 'prompts'
import { onCancel } from '@utils/onCancel'
import { nameSchema, passwordSchema, birthDateSchema } from '@utils/joiSchemas'
import { Details } from '@utils/interfaces'

const nameInvalidErr = "Name must have equal or more than 3 characters."
const passwordInvalidErr = "Password must have equal or more than 8 characters."
const birthdateInvalidErr = "Birth date must be from 1 to 31."

const newName = async () => {
	let newname = await prompts({
		type: "text",
		name: "newname",
		message: "New name:",
		validate: n => !nameSchema.validate(n)['error'] ? true : nameInvalidErr,
	}, { onCancel })
	return newname.newname
}
const newPassword = async () => {
	let newpassword = await prompts({
		type: "password",
		name: "newpw",
		message: "New password:",
		validate: pw => !passwordSchema.validate(pw)['error'] ? true : passwordInvalidErr
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
		validate: bdate => !birthDateSchema.validate(bdate)['error'] ? true : birthdateInvalidErr
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
export {
	newName,
	newPassword,
	newBirthMonth,
	newBirthDate,
	newBirthYear,
	whatToEdit
}