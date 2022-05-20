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
	nameToSlugify
}