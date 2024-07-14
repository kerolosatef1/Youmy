class inputValidator{
	constructor(name_input_id,email_input_id,phone_input_id,age_input_id,password_input_id,repassword_input_id) {
		this.name = document.getElementById(name_input_id);
		this.email = document.getElementById(email_input_id);
		this.phone = document.getElementById(phone_input_id);
		this.age = document.getElementById(age_input_id);
		this.password = document.getElementById(password_input_id);
		this.repassword = document.getElementById(repassword_input_id);
	}

	nameValidation() {
		return (/^[a-zA-Z ]+$/.test(this.name.value))
	}

	emailValidation() {
		return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email.value))
	}

	phoneValidation() {
		return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(this.phone.value))
	}

	ageValidation() {
		return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(this.age.value))
	}

	passwordValidation() {
		return (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(this.password.value))
	}

	repasswordValidation() {
		return this.repassword.value === this.password.value
	}
}