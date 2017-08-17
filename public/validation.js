function validate(){
	var username          = document.forms["myForm"]["fname"].value;
	var password          = document.forms["myForm"]["lname"].value;
	var confPass        = document.forms["myForm"]["address"].value;
	var age           = document.forms["myForm"]["city"].value;
	
	var question1, question2, question3, isAdmin;
	
	var errors = false
	var errorMessages = '<ul>';
	if(req.body.username.lenth === 0) {
		errors = true;
		errorMessages += '<li>You need a username</li>';
	}
	if(req.body.password.length === 0){
		errors = true;
		errorMessages += '<li>You need a password</li>';
	}
	if(req.body.password !== req.body.confPass) {
		errors = true;
		errorMessages += '<li>Passwords need to match</li>';
	}
	if(req.body.age.length == 0) {
		errors = true;
		errorMessages += '<li>You must have an age</li>';
	}
	errorMessages += '</ul>';
	
	if(errors) {
		document.getElementById("response").innerHTML = error_msg;
	}
}