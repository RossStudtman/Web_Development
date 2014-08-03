/*
	Ross Studtman
	CIS 131 - Web Dev 2
	Project 3: Monthly Balance Calculator - login
	Shane May
	11/08/2012
*/

	// set focus at window load
	window.addEventListener('load', focus, false);

	/*
		Event handler for window load event.
	*/
	function focus(){
		document.forms[0].elements[0].focus();
	}

	// add event listener to verify button 
	document.getElementById('verify').addEventListener('click', checkUser, false);

	/*
		Event handler for verify button click.
		
		@param event is the event that triggered this function.
	*/
	function checkUser(event){
	
		// interesting note: even though the button isn't of type submit, it submits the form.
		// this prevents the form from being submitted:
		event.preventDefault();
		
		// obtain user name from form 
		var name = this.form.userName.value;

		// obtain password from form 
		var password = this.form.password.value;
		
		// is the password valid?
		if(isValidPassword(password)){
		
			// create new Date object for cookie's expiration
			var expires = new Date();
			
			// increase expire time by 10 minutes
			expires.setMinutes(expires.getMinutes() + 10);
			
			// write userName cookie
			document.cookie = "userName=" + encodeURIComponent(name) +
				"; expires=" + expires.toUTCString();
				
			// write password cookie
			document.cookie = "password=" +encodeURIComponent(password) +
				"; expires=" + expires.toUTCString();		
		
			// password is valid, allow entry to private web page.
			location.href = "project3.html";
			
		}else{
			// password was not valid
			alert("Password must be at least 1 character in length.");
			this.form.password.focus();			
		}
	}
	
	/*
		Determines if password meets validation requirements.
		
		@param password is the data to validate.
		
		@return true if password validates, else false.
	*/
	function isValidPassword(password){
	
		// regular expression
		var regEx = /\w+/;
		
		// some password validation code, keeping it simple:
		if(regEx.test(password)){
		
			// good enough
			return true;
		}else{
		
			// password did not meet requirements
			return false;
		}
	}	
