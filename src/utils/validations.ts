import { yellow } from 'colorette'

const NameValidationPattern =  /^[\w]{3,}$/
const PasswordValidationPattern = /^[\w]{8,}$/

const NameValidation = (password) => {
	if (password.match(NameValidationPattern) === null) {
		console.error(yellow("\nName must have equal or more than 3 characters."))
	} else {
		return true
	}
}

const PasswordValidation = (password) => {
	if (password.match(PasswordValidationPattern) === null) {
		console.error(yellow("\nPassword must have equal or more than 8 characters."))
	} else {
		return true
	}
}

export { PasswordValidation, NameValidation }