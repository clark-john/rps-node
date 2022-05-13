import { prompt } from 'inquirer'

const historyClearConfirmation = () => {
	let response = prompt(
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

export { historyClearConfirmation }