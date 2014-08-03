/*
	Ross Studtman
	CIS 131 - Web Dev 2
	Lesson 9 exercises: 8-4, 8-4a.
	Shane May
	11/1/2012
*/

/*
	Goal: Allow two different HTML pages to share one javascript file.
	
	My solution: Obtain the name of the HTML file and use that in a conditional to determine
	which HTML page's javascript to run.
	
	Other solutions I researched or thought might work:

		A) 	Give each <body> element an ID and if that ID is matched then
			run a specific set of .js code.
			
		B) 	Use window.location in some fashion and run the .js code that way. (what I chose)
	
		C)	Given this post about using DIVs with ID's to act as different "web pages":
	
			http://stackoverflow.com/questions/8211128/multiple-distinct-pages-in-one-html-file
	
			...it might be best to simply blanket each webpage in a DIV with the "web page's" id
			and then run the .js that is apppropriate for that div. This would also give the 
			ability to target multiple "web page" divs and code javascript with common functionality 
			between them by using both ID's.
	
			While that is a good notion, this lesson exercise uses two web pages and I want to 
			stick with that format because I need to know how to handle that, too.
*/

	/* attach event handler to page load */
	window.addEventListener('load', startUp, false);
	
	function startUp(){
	
		// Obtain name of this HTML file
		var pathnameArray = window.location.pathname.split("/");
		var nameOfFile = pathnameArray[pathnameArray.length -1];
		
		// proof it works
		console.log(nameOfFile); // lesson9_cookies.html
		
		// use code for lesson9_cookies.html
		if(nameOfFile === "lesson9_cookies.html"){
		
			// run javascript code for this page
			runLesson_9_cookies_HTML();
			
		}//else don't run code for this html file.
		
		// use code for lesson9_privatePage.html
		if(nameOfFile === "lesson9_privatePage.html"){
		
			runLesson_9_privatePage_HTML();
			
		}//else don't run code for this file.
	}
	
//
//	EXERCISE 8-4 CODE
//	
	/*  
		runLession_9_cookies_HTML is a function that will run the javascript
		for lesson9_cookies.html
	*/
	function runLesson_9_cookies_HTML(){
	/*
		Valuable lesson on event bubbling!
		
		At some point I attached a click event to the entire form with the id "exercise8_4form".
		
		I also attached a click event to the input of type **button** that has the value of "Submit"
		-- but it is not a submit button, so it will not generate a "submit" event.
		
		By doing this I learned about "event bubbling": when a child-element generates an event,
		that event can bubble up to the parent elements and if they have function listening for that
		type of event (a 'click' event in this case) to occur then the parent will also be triggered!
		
		To stop the event from bubbling up from child-->parent: use event.stopPropagation() in the
		button's event handler. Then, only the click event associated with the button fires.
	*/
	
		// attach event handler to form's Button
		document.getElementById('theButton').addEventListener('click', storePass, false);
	
		// "theButton's" event handler
		function storePass(event){
		
			// stop the click event from bubbling up and activating the form's click event.
			event.stopPropagation();
			
			// obtain the form that this control is housed within.
			var theForm = this.form;
			
			// Create cookie
			document.cookie = "password=" + theForm.lessonPassword.value;
			
			alert(document.cookie);
			
			// call coolieValidation function
			cookieValidation(); 	// causes redirect to another html page.
		}
		
		// attach event handler to exercise8_4form. This sets up a click even on the ENTIRE form.
		document.getElementById('exercise8_4form').addEventListener('click', learnStuff, false);	
	
		// "exercise8_4form" event handler
		function learnStuff(event){
		
			// What you can do with "this":		
			
				/* command */							/* output in console */
				
			// What is "this"?
			console.log(this);							// <form id="exercise8_4form" action"">
			
			// What is "this.idOfSomeElement"
			console.log(this.lessonPassword);			// <input type="text" name="passWord">
			
			// What is the value inside the form's element?
			console.log(this.lessonPassword.value);		// prints whatever was put in the text input.

			// What is the value of the "password"? --> password NOT safe!
			console.log(this.realPassword.value);		// prints whatever was put into the password input.
			
			// What is the event that triggered this listener?
			console.log(event);							// click clientX=32, clientY=148
			
			// How many child nodes are in this form?
			console.log(this.childNodes.length);		// 25
			
			// List the child nodes in this form:
			console.log(this.childNodes);				// [<TextNode textContent="\n  ">, p, ...rest of Node List]
				
				/* notes:
					this.childNodes returned a Node List, not an array, though they are similar.
					Notice this node list includes the text nodes, those often "invisible" nodes sitting after all block (?) elements.
					
					So basically the result is showing us:
					
						1) TextNode					11) TextNode			21) TextNode
						2) paragraph element		12) input - male		22)	paragraph
						3) TextNode					13) TextNode			23)	TextNode
						4) paragraph element		14)	input - female		24)	paragraph
						5) TextNode					15)	TextNode			25) TextNode
						6) paragraph element		16)	input - twix
						7) TextNode					17)	TextNode
						8) paragraph element		18)	input - heath
						9) TextNode					19)	TextNode
						10)Comment					20)	select
					
					Notice, <input> elements inside <p> elements are not direct childNodes of the form. 
				*/
			
			// Show all the elements in this form:
			console.log(this.getElementsByTagName('*')); 	
				// [p, input, p, input, p, input--submit, input, p, input--male, input--female, input--twix, input--heath, select, option, option, option, p, p]
			
			// Get a collection of the form's elements:
			var formElements = this.getElementsByTagName('*');
			
			// iterate over the collection of elements
			for (var i = 0; i < formElements.length; i++){
			
				// Look for elements that have an "id" attribute in them.
				if(formElements[i].getAttribute('id')){
				
					// Log the elements' ids, their type, and their value:
					console.log("form element with id \"" +formElements[i].getAttribute('id') + "\" is of type: "
					+formElements[i].type +", with value: " +formElements[i].value);
					
				}// else do nothing.
			}
				
			// Lastly, note the difference between these:
			console.log(this.length);								// 9	...number of elements in the form.
			console.log(this.elements.length);						// 9	...number of elements in the form.
			console.log(this.children.length)						// 11	...number of child nodes that are elements
			console.log(this.childNodes.length);					// 25	...number of direct children, including text nodes
			console.log(this.getElementsByTagName('*').length);		// 18	...number of all children, except text nodes
			
			/*
				A very (very) good source: http://www.w3.org/TR/html51/forms.html#introduction-1
				
				form.length 		--> returns # of controls in the form.
				form.elements 		--> returns collection of form controls.
				form.elements.length--> the size of the returned collection of form controls.			
			*/			
		}
	}//end runLesson_9_cookies_HTML().

	/*
		cookieValidation function determines if a cookie is valid.
		If cookie is valid allow user to access private page.
		If not valid user stays on login page. 
	*/
	function cookieValidation(){
	
		if(isValidCookie()){
			
			// location.href reports the URL location of the current page.
			var href = location.href;
			
			// Show current value of location.href
			alert("current location.href: " + href);
			
			// Setting location.href to a different URL will direct user to that URL.
			location.href = "lesson9_privatePage.html";
			
			// This code will not run because the other HTML page will be loaded.
			alert("after location.href shunt"); 
			
		}//else do nothing.
	}// end cookieValidation().
	
	/*
		Determines if cookie contains valid password.
		@return true if cookie contains valid password, else false.
	*/
	function isValidCookie(){
	
		// Get a string containing all the cookies
		var allCookies = document.cookie;
		
		// If the allCookies string contains the "password=hello" string return true.
		if (allCookies.indexOf("password=hello") != -1){
		
			// Return true
			alert("The isValidCookie function has returned 'true' to cookieValidation() function.");
			return true;
		} 
		else {
		
			// "password=hello" was not found in the cookie string; return false.
			alert("Incorrect password. Try again.");
			return false;			
		}
	}

	/*  
		runLession_9_privatePage_HTML is a function that will run the javascript
		for lesson9_cookies.html
	*/
	function runLesson_9_privatePage_HTML(){
	
		// Add event listener to button.
		document.getElementById('privateButton').addEventListener('click', youDidIt, false);
		
		// Event handler for privateButton.
		function youDidIt(){
		
			alert("Look at that! One javascript file for two web pages!");
			
		}
	}//end runPrivatePage().