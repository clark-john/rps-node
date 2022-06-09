import { writeFile, readFile } from 'fs/promises'
import { hide } from "hidefile";
import fileExists from "file-exists";

const jsonpath = './src/user/login.json'
const jsonpath_hidden = './src/user/.login.json'

const pushLogin = async (userLoggedIn: string, rememberPass: boolean) => {
	const json = {
		name: userLoggedIn,
		rememberPassword: rememberPass
	}
	const data = JSON.stringify(json)
	await writeFile(jsonpath, data)
	
	if (await fileExists(jsonpath).then(exists => {
		return exists
	})){
		hide(jsonpath, () => {void(0)})	
	}
}
const getLogin = async () => {
	try {
		const jsonfile = await readFile(jsonpath_hidden, 'utf8')
		const parseJSON = JSON.parse(jsonfile)
		return parseJSON
	} catch(err) {
		return null 
	}
}

export { pushLogin, getLogin }