import { yellow } from 'colorette'

const NameValidationPattern =  /^[\w]{3,}$/
const PasswordValidationPattern = /^[\w]{8,}$/
const BirthDateValidationPattern = /^([1-9]|[12][\d]|3[01])$/

const BirthDateValidation = (birthdate: string) => {
	if (birthdate.match(BirthDateValidationPattern) === null) {
		console.error(yellow("\nBirth date must be from 1 to 31."))
	} else {
		return true
	}
}

const NameValidation = (name: string) => {
	if (name.match(NameValidationPattern) === null) {
		console.error(yellow("\nName must have equal or more than 3 characters."))
	} else {
		return true
	}
}

const PasswordValidation = (password: string) => {
	if (password.match(PasswordValidationPattern) === null) {
		console.error(yellow("\nPassword must have equal or more than 8 characters."))
	} else {
		return true
	}
}

export { 
	PasswordValidation, 
	NameValidation,
	BirthDateValidation
}