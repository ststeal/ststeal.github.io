function User(firstName ,surname) {
	this.firstName = firstName;
	this.surname = surname;
	this.getFullName = function() {
		return [firstName,surname].join(' ');
	};
}