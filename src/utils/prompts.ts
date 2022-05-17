import { prompt } from 'inquirer'




// Login related things

const userOrGuest = () => {
	let response: Promise<string> = prompt(
		[
			{
				"type": "list",
				"name": "login",
				"message": "Login as user or guest? Don't have an account? Choose \"Register new one\"",
				"choices": [
					"User",
					"Guest",
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

const user = () => {
	let response: Promise<string> = prompt(
		[
			{
				"type": "input",
				"name": "user",
				"message": "User:"
			}
		]
	).then(res => {
		res = res.user
		return res
	}).catch(err => {
		throw err
	})
	return response
}

const password = () => {
	let response: Promise<string> = prompt(
		[
			{
				"type": "password",
				"name": "password",
				"message": "Password:",
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

// tui related

const nameToSlugify = async () => {
	let response = await prompt(
		[
			{
				"type": "input",
				"name": "slug",
				"message": "Type a string to slugify:"
			}
		]
	).then(res => {
		res = res.slug
		return res
	}).catch(err => {
		throw err
	})
	return response
}

const historyClearConfirmation = async () => {
	let response = await prompt(
		[
			{
				"type": "confirm",
				"name": "confirmation",
				"message": "Are you sure you want to clear the history?"
			}
		]
	).then(res=>{
		res = res.confirmation
		return res
	})
	.catch(err=>{
		throw err
	})
	return response
}


// exporting

export { 
	historyClearConfirmation,
	userOrGuest,
	nameToSlugify,
	user,
	password
}