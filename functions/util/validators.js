const isEmpty = (string) => {
	if (string.trim() === '') return true;
	else return false;
};
const errorMsg = {
	empty: 'Must not be empty',
	password: 'Passowrds must be the same',
	email: 'Must be valid email address'
}
exports.validateLoginData = (data) => {
	let errors = {};

	if (isEmpty(data.email)) errors.email = errorMsg.empty;
	if (isEmpty(data.password)) errors.password = errorMsg.empty;

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};

const isEmail = (email) => {
	const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email.match(emailRegEx)) return true;
	else return false;
};

exports.validateSignUpData = (data) => {
	let errors = {};


	if (isEmpty(data.email)) {
		errors.email = errorMsg.empty;
	} else if (!isEmail(data.email)) {
		errors.email = errorMsg.email;
	}

	if (isEmpty(data.firstName)) errors.firstName = errorMsg.empty;
	if (isEmpty(data.lastName)) errors.lastName = errorMsg.empty;
	if (isEmpty(data.phoneNumber)) errors.phoneNumber = errorMsg.empty;
	if (isEmpty(data.country)) errors.country = errorMsg.empty;

	if (isEmpty(data.password)) errors.password = errorMsg.empty;
	if (data.password !== data.confirmPassword) errors.confirmPassword = errorMsg.password;
	if (isEmpty(data.username)) errors.username = errorMsg.empty;

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};