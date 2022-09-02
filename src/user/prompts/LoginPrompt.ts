import { getLogin } from '@user/sendLoginToJSON';
import { onCancel } from '@utils/onCancel';
import prompts from 'prompts';
import empty from 'is-empty';

const userOrGuest = async () => {
	let user = empty(await getLogin()) ? '' : await getLogin();
	let response = await prompts({
		type: "select",
		name: "login",
		message: "Login as user or guest? Don't have an account? Choose \"Register new one\"",
		"choices": [
			{ title: "Guest", value: "Guest" },
			{ title: `User ${user.name ? `(${user.name})` : ''}`, value: "User" },
			{ title: "Register new one", value: "Register new one" },
			{ title: "Logout", value: "Logout" },
			{ title: "Exit", value: "Exit" }
		]
	});
	return response.login;
};

const userPassword = async () => {
	let response = await prompts(
		[
			{
				type: "text",
				name: "user",
				message: "User:"
			},
			{
				type: "password",
				name: "password",
				message: "Password:"
			}
		], { onCancel }
	);
	return response;
};

const rememberPassword = async () => {
	let response = await prompts({
		type: "confirm",
		name: "confirmation",
		message: "Remember password?"
	});
	return response.confirmation;
};

export { 
	userOrGuest,
	userPassword,
	rememberPassword,
};
