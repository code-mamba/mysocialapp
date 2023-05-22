export const validateForm = (name, email, password, confirmpassword) => {
	const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
	let errors = {};
	if (name === ""||name ==null) {
	  errors.name = "Please fill the name field";
	  return false
	}
	if (email===""||email== null) {
	  errors.email = "Please fill the Email field";
	  return false
	} else if (!email.match(emailPattern)) {
	  errors.email = "Please enter a valid email address";
	  return false
	}
	if (password===""||password==null) {
	  errors.password = "Please fill Password field";
	  return false
	} else if (!password.match(passwordPattern)) {
	  errors.password = "Password must be at least 8 characters long and contain at least one letter, one number, and one special character.";
	  return false
	}
	if (!confirmpassword) {
	  errors.confirmpassword = "Please fill the Confirm password field";
	  return false
	}if (confirmpassword !== password) {
	  errors.confirmpassword = "Both passwords must be the same";
	  return false
	}
	return errors;
  };