import { prompt } from 'inquirer'

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

const userOrGuest = () => {
	let response = prompt(
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
	let response = prompt(
		[
			{
				"type": "input",
				"name": "user",
				"message": ""
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
	let response = prompt(
		[
			{
				"type": "input",
				"name": "password",
				"message": ""
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

export { 
	historyClearConfirmation,
	userOrGuest,
	nameToSlugify,
	user,
	password
}