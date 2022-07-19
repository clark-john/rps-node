import prompts from 'prompts'
import moment from 'moment'
import { onCancel } from '@utils/onCancel'
import { 
	nameSchema, 
	passwordSchema, 
	birthDateSchema,
	birthYearSchema
} from '@utils/joiSchemas'

const maximumYear = Number(moment(Date.now()).format('Y'))

const nameInvalidErr = "Name must have equal or more than 3 characters."
const passwordInvalidErr = "Password must have equal or more than 8 characters."
const birthDateInvalidErr = "Birth date must be from 1 to 31."
const birthYearInvalidErr = `Birth year must be from 1950 to ${maximumYear}.`

const registerNamePassword = async () => {
	let response = await prompts(
		[
			{
				type: "text",
				name: "name",
				message: "What's your name?",
				validate: name => 
					!nameSchema.validate(name)['error'] ? true : nameInvalidErr
			},
			{
				type: "password",
				name: "password",
				message: "Enter your password:",
				validate: password => 
					!passwordSchema.validate(password)['error'] ? true : passwordInvalidErr 
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
				type: "select",
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
				validate: birthdate => 
					!birthDateSchema.validate(birthdate)['error'] ? true : birthDateInvalidErr
			},
			{
				type: "number",
				name: "birthyear",
				message: "Birth Year",
				validate: birthyear => 
					!birthYearSchema.validate(birthyear)['error'] ? true : birthYearInvalidErr
			},
			{
				type: "select",
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

export { registerNamePassword, confirmPassword, someDetails }