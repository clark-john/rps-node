import prompts from 'prompts';

const historyClearConfirmation = async () => {
	let response = await prompts({
		type: "confirm",
		name: "confirmation",
		message: "Are you sure you want to clear the history?"
	});
	return response.confirmation;
};

const nameToSlugify = async () => {
	let response = await prompts({
		type: "text",
		name: "slug",
		message: "Type a string to slugify:"
	});
	return response.slug;
};

export { 
	historyClearConfirmation,
	nameToSlugify
};
