function validate(){
	var username          = document.forms["myForm"]["fname"].value;
	var password          = document.forms["myForm"]["lname"].value;
	var confPass        = document.forms["myForm"]["address"].value;
	var age           = document.forms["myForm"]["city"].value;
	
	var question1, question2, question3, isAdmin;
	
	var errors = false
	var errorMessages = [];
	if(req.body.username.lenth == 0) {
		errors = true;
		errorMessages.push('You need a username');
	}
	if(req.body.password.length == 0){
		errors = true;
		errorMessages.push('You need a password');
	}
	if(req.body.password !== req.body.confPass) {
		errors = true;
		errorMessages.push('Passwords need to match')
	}
}