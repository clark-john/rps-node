import { prompt } from 'inquirer'

const confirm = async () => {
	let res = await prompt([
		{
			"type": "confirm",
			"name": "confirm",
			"message": "Are you sure?" 
		}
	])
	return res
}

export { confirm }